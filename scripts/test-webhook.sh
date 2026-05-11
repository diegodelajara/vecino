#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
PAYMENT_ID="${1:-${PAYMENT_ID:-}}"
WEBHOOK_SECRET="${MERCADOPAGO_WEBHOOK_SECRET:-}"

if [ -z "${WEBHOOK_SECRET}" ] && [ -f ".env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source ./.env.local
  set +a
  WEBHOOK_SECRET="${MERCADOPAGO_WEBHOOK_SECRET:-}"
fi

if [ -z "${PAYMENT_ID}" ]; then
  echo "Usage: npm run test:webhook -- <paymentId>"
  echo "Or set PAYMENT_ID as an environment variable."
  exit 1
fi

if [ -z "${WEBHOOK_SECRET}" ]; then
  echo "MERCADOPAGO_WEBHOOK_SECRET is required."
  echo "Set it in your shell or .env.local before running this script."
  exit 1
fi

REQUEST_ID_INVALID="test-invalid-req"
REQUEST_ID_VALID="test-valid-req"
TS="1713456000"
BODY="{\"type\":\"payment\",\"data\":{\"id\":\"${PAYMENT_ID}\"}}"

echo "Testing webhook on ${BASE_URL}/api/webhooks/mercadopago"
echo "Payment ID: ${PAYMENT_ID}"

INVALID_STATUS=$(curl -s -o /tmp/webhook_invalid_response.json -w "%{http_code}" \
  -X POST "${BASE_URL}/api/webhooks/mercadopago" \
  -H "Content-Type: application/json" \
  -H "x-request-id: ${REQUEST_ID_INVALID}" \
  -H "x-signature: ts=${TS},v1=deadbeef" \
  -d "${BODY}")

if [ "${INVALID_STATUS}" != "401" ]; then
  echo "FAIL: invalid signature expected 401, got ${INVALID_STATUS}"
  echo "Response:"
  sed -n '1,5p' /tmp/webhook_invalid_response.json
  exit 1
fi

echo "PASS: invalid signature rejected with 401"

VALID_SIGNATURE=$(node -e "const crypto=require('crypto'); const id=process.argv[1]; const requestId=process.argv[2]; const ts=process.argv[3]; const secret=process.argv[4]; const manifest='id:'+id+';request-id:'+requestId+';ts:'+ts+';'; const v1=crypto.createHmac('sha256',secret).update(manifest).digest('hex'); process.stdout.write('ts='+ts+',v1='+v1);" \
  "${PAYMENT_ID}" "${REQUEST_ID_VALID}" "${TS}" "${WEBHOOK_SECRET}")

VALID_STATUS=$(curl -s -o /tmp/webhook_valid_response.json -w "%{http_code}" \
  -X POST "${BASE_URL}/api/webhooks/mercadopago" \
  -H "Content-Type: application/json" \
  -H "x-request-id: ${REQUEST_ID_VALID}" \
  -H "x-signature: ${VALID_SIGNATURE}" \
  -d "${BODY}")

if [ "${VALID_STATUS}" != "200" ]; then
  echo "FAIL: valid signature expected 200, got ${VALID_STATUS}"
  echo "Response:"
  sed -n '1,5p' /tmp/webhook_valid_response.json
  exit 1
fi

echo "PASS: valid signature accepted with 200"
echo "Webhook signature tests completed successfully."
