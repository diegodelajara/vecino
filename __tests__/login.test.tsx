import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "@/app/(features)/containers/login";

// Mock del hook useLogin
vi.mock("@/app/(features)/containers/login/login.hooks", () => ({
  useLogin: vi.fn(() => ({
    email: "",
    password: "",
    loading: false,
    handleLogin: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),
    error: null,
  })),
}));

import { useLogin } from "@/app/(features)/containers/login/login.hooks";

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login card with title", () => {
    render(<Login />);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("renders email input field", () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("correo@ejemplo.com");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders password input field", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText("••••••••");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renders submit button", () => {
    render(<Login />);
    const button = screen.getByRole("button", { name: /ingresar/i });
    expect(button).toBeInTheDocument();
  });

  it("calls handleLogin when button is clicked", () => {
    const mockHandleLogin = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      email: "test@example.com",
      password: "password123",
      loading: false,
      handleLogin: mockHandleLogin,
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      error: null,
    });

    render(<Login />);
    const button = screen.getByRole("button", { name: /ingresar/i });
    fireEvent.click(button);
    expect(mockHandleLogin).toHaveBeenCalled();
  });

  it("updates email input value when changed", () => {
    const mockSetEmail = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      email: "test@example.com",
      password: "",
      loading: false,
      handleLogin: vi.fn(),
      setEmail: mockSetEmail,
      setPassword: vi.fn(),
      error: null,
    });

    render(<Login />);
    const emailInput = screen.getByPlaceholderText(
      "correo@ejemplo.com",
    ) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    expect(mockSetEmail).toHaveBeenCalled();
  });

  it("updates password input value when changed", () => {
    const mockSetPassword = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      email: "",
      password: "password123",
      loading: false,
      handleLogin: vi.fn(),
      setEmail: vi.fn(),
      setPassword: mockSetPassword,
      error: null,
    });

    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(
      "••••••••",
    ) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    expect(mockSetPassword).toHaveBeenCalled();
  });

  it("shows loading state in button", () => {
    vi.mocked(useLogin).mockReturnValue({
      email: "",
      password: "",
      loading: true,
      handleLogin: vi.fn(),
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      error: null,
    });

    render(<Login />);
    const button = screen.getByRole("button", { name: /ingresando/i });
    expect(button).toHaveAttribute("disabled");
  });

  it("disables button when loading", () => {
    vi.mocked(useLogin).mockReturnValue({
      email: "",
      password: "",
      loading: true,
      handleLogin: vi.fn(),
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      error: null,
    });

    render(<Login />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
