import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

vi.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: () => false,
}));

vi.mock("lucide-react", () => ({
  PanelLeftIcon: () => <span>Panel</span>,
}));

describe("Sidebar Components", () => {
  it("sidebar module exports all components", async () => {
    const sidebarModule = await import("@/components/ui/sidebar");
    expect(typeof sidebarModule.SidebarProvider).toBe("function");
    expect(typeof sidebarModule.Sidebar).toBe("function");
    expect(typeof sidebarModule.useSidebar).toBe("function");
    expect(typeof sidebarModule.SidebarTrigger).toBe("function");
    expect(typeof sidebarModule.SidebarMenu).toBe("function");
    expect(typeof sidebarModule.SidebarMenuButton).toBe("function");
    expect(typeof sidebarModule.SidebarMenuItem).toBe("function");
    expect(typeof sidebarModule.SidebarMenuSub).toBe("function");
    expect(typeof sidebarModule.SidebarMenuSubButton).toBe("function");
    expect(typeof sidebarModule.SidebarMenuSubItem).toBe("function");
    expect(typeof sidebarModule.SidebarRail).toBe("function");
    expect(typeof sidebarModule.SidebarInset).toBe("function");
  });

  it("SidebarMenu renders with data-slot attribute", async () => {
    const { SidebarMenu } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenu>Menu Content</SidebarMenu>);
    const menuElement = container.querySelector('[data-slot="sidebar-menu"]');
    expect(menuElement).toBeInTheDocument();
  });

  it("SidebarMenuItem renders with data-slot attribute", async () => {
    const { SidebarMenuItem } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenuItem>Item</SidebarMenuItem>);
    const itemElement = container.querySelector(
      '[data-slot="sidebar-menu-item"]',
    );
    expect(itemElement).toBeInTheDocument();
  });

  it("SidebarMenuSub renders with data-slot attribute", async () => {
    const { SidebarMenuSub } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenuSub>Submenu</SidebarMenuSub>);
    const subElement = container.querySelector(
      '[data-slot="sidebar-menu-sub"]',
    );
    expect(subElement).toBeInTheDocument();
  });

  it("SidebarMenu applies custom className", async () => {
    const { SidebarMenu } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenu className="custom-menu">Menu</SidebarMenu>,
    );
    const menuElement = container.querySelector('[data-slot="sidebar-menu"]');
    expect(menuElement).toHaveClass("custom-menu");
  });

  it("SidebarMenuItem applies custom className", async () => {
    const { SidebarMenuItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuItem className="custom-item">Item</SidebarMenuItem>,
    );
    const itemElement = container.querySelector(
      '[data-slot="sidebar-menu-item"]',
    );
    expect(itemElement).toHaveClass("custom-item");
  });

  it("useSidebar hook is a function", async () => {
    const sidebarModule = await import("@/components/ui/sidebar");
    expect(typeof sidebarModule.useSidebar).toBe("function");
  });

  it("SidebarProvider renders with context wrapper", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider>
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper).toBeInTheDocument();
  });

  it("SidebarProvider passes CSS variables", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider>
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper?.getAttribute("style")).toContain("--sidebar-width");
    expect(wrapper?.getAttribute("style")).toContain("--sidebar-width-icon");
  });

  it("SidebarProvider applies custom className", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider className="custom-provider">
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper).toHaveClass("custom-provider");
  });

  it("SidebarMenuButton is exported and is a function", async () => {
    const { SidebarMenuButton } = await import("@/components/ui/sidebar");
    expect(typeof SidebarMenuButton).toBe("function");
  });

  it("SidebarMenuSubItem renders with correct slot", async () => {
    const { SidebarMenuSubItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubItem>SubItem</SidebarMenuSubItem>,
    );
    const subItem = container.querySelector(
      '[data-slot="sidebar-menu-sub-item"]',
    );
    expect(subItem).toBeInTheDocument();
  });

  it("SidebarRail is exported and is a function", async () => {
    const { SidebarRail } = await import("@/components/ui/sidebar");
    expect(typeof SidebarRail).toBe("function");
  });

  it("SidebarInset renders with correct slot", async () => {
    const { SidebarInset } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarInset>
        <div>Inset Content</div>
      </SidebarInset>,
    );
    const inset = container.querySelector('[data-slot="sidebar-inset"]');
    expect(inset).toBeInTheDocument();
  });

  it("SidebarMenuSubButton renders correctly", async () => {
    const { SidebarMenuSubButton } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubButton>Sub Action</SidebarMenuSubButton>,
    );
    const button = container.querySelector(
      '[data-slot="sidebar-menu-sub-button"]',
    );
    expect(button).toBeInTheDocument();
  });

  it("Sidebar component renders with correct data-slot", async () => {
    const { SidebarProvider, Sidebar } = await import(
      "@/components/ui/sidebar"
    );
    const { container } = render(
      <SidebarProvider>
        <Sidebar>
          <div>Sidebar Content</div>
        </Sidebar>
      </SidebarProvider>,
    );
    const sidebar = container.querySelector('[data-slot="sidebar"]');
    expect(sidebar).toBeInTheDocument();
  });

  it("SidebarMenu renders as list", async () => {
    const { SidebarMenu } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenu>Menu</SidebarMenu>);
    const menuElement = container.querySelector('[data-slot="sidebar-menu"]');
    expect(menuElement?.tagName).toBe("UL");
  });

  it("SidebarMenuItem renders as list item", async () => {
    const { SidebarMenuItem } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenuItem>Item</SidebarMenuItem>);
    const itemElement = container.querySelector(
      '[data-slot="sidebar-menu-item"]',
    );
    expect(itemElement?.tagName).toBe("LI");
  });

  it("SidebarMenuSub renders as list", async () => {
    const { SidebarMenuSub } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenuSub>Sub</SidebarMenuSub>);
    const subElement = container.querySelector(
      '[data-slot="sidebar-menu-sub"]',
    );
    expect(subElement?.tagName).toBe("UL");
  });

  it("SidebarMenuSubItem renders as list item", async () => {
    const { SidebarMenuSubItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubItem>SubItem</SidebarMenuSubItem>,
    );
    const subItem = container.querySelector(
      '[data-slot="sidebar-menu-sub-item"]',
    );
    expect(subItem?.tagName).toBe("LI");
  });

  it("SidebarInset renders with data-slot", async () => {
    const { SidebarInset } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarInset>Content</SidebarInset>);
    const inset = container.querySelector('[data-slot="sidebar-inset"]');
    expect(inset).toBeInTheDocument();
  });

  it("SidebarProvider wrapper is a div", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider>
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper?.tagName).toBe("DIV");
  });

  it("SidebarProvider has flex layout", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider>
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper?.className).toContain("flex");
  });

  it("SidebarProvider children are rendered", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider>
        <span>Test Content Child</span>
      </SidebarProvider>,
    );
    expect(container.textContent).toContain("Test Content Child");
  });

  it("SidebarMenu children are rendered", async () => {
    const { SidebarMenu } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenu>
        <span>Menu Child</span>
      </SidebarMenu>,
    );
    expect(container.textContent).toContain("Menu Child");
  });

  it("SidebarMenuItem children are rendered", async () => {
    const { SidebarMenuItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuItem>
        <span>Item Child</span>
      </SidebarMenuItem>,
    );
    expect(container.textContent).toContain("Item Child");
  });

  it("SidebarMenuSub children are rendered", async () => {
    const { SidebarMenuSub } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSub>
        <span>Sub Child</span>
      </SidebarMenuSub>,
    );
    expect(container.textContent).toContain("Sub Child");
  });

  it("SidebarMenuSubItem children are rendered", async () => {
    const { SidebarMenuSubItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubItem>
        <span>SubItem Child</span>
      </SidebarMenuSubItem>,
    );
    expect(container.textContent).toContain("SubItem Child");
  });

  it("SidebarInset children are rendered", async () => {
    const { SidebarInset } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarInset>
        <span>Inset Child</span>
      </SidebarInset>,
    );
    expect(container.textContent).toContain("Inset Child");
  });

  it("SidebarMenu accepts id prop", async () => {
    const { SidebarMenu } = await import("@/components/ui/sidebar");
    const { container } = render(<SidebarMenu id="test-menu">Menu</SidebarMenu>);
    const menu = container.querySelector('[data-slot="sidebar-menu"]');
    expect(menu?.id).toBe("test-menu");
  });

  it("SidebarMenuItem accepts id prop", async () => {
    const { SidebarMenuItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuItem id="test-item">Item</SidebarMenuItem>,
    );
    const item = container.querySelector('[data-slot="sidebar-menu-item"]');
    expect(item?.id).toBe("test-item");
  });

  it("SidebarInset accepts id prop", async () => {
    const { SidebarInset } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarInset id="test-inset">Content</SidebarInset>,
    );
    const inset = container.querySelector('[data-slot="sidebar-inset"]');
    expect(inset?.id).toBe("test-inset");
  });

  it("all sidebar components are unique functions", async () => {
    const sidebarModule = await import("@/components/ui/sidebar");
    const exports = [
      sidebarModule.SidebarProvider,
      sidebarModule.Sidebar,
      sidebarModule.useSidebar,
      sidebarModule.SidebarTrigger,
      sidebarModule.SidebarMenu,
      sidebarModule.SidebarMenuButton,
      sidebarModule.SidebarMenuItem,
      sidebarModule.SidebarMenuSub,
      sidebarModule.SidebarMenuSubButton,
      sidebarModule.SidebarMenuSubItem,
      sidebarModule.SidebarRail,
      sidebarModule.SidebarInset,
    ];
    const uniqueExports = new Set(exports);
    expect(uniqueExports.size).toBe(exports.length);
  });

  it("SidebarTrigger is exported correctly", async () => {
    const { SidebarTrigger } = await import("@/components/ui/sidebar");
    expect(typeof SidebarTrigger).toBe("function");
  });

  it("SidebarMenuSubButton applies custom className", async () => {
    const { SidebarMenuSubButton } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubButton className="custom-btn">Action</SidebarMenuSubButton>,
    );
    const button = container.querySelector(
      '[data-slot="sidebar-menu-sub-button"]',
    );
    expect(button).toHaveClass("custom-btn");
  });

  it("SidebarMenuSubItem applies custom className", async () => {
    const { SidebarMenuSubItem } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarMenuSubItem className="custom-sub-item">Item</SidebarMenuSubItem>,
    );
    const item = container.querySelector(
      '[data-slot="sidebar-menu-sub-item"]',
    );
    expect(item).toHaveClass("custom-sub-item");
  });

  it("SidebarInset applies custom className", async () => {
    const { SidebarInset } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarInset className="custom-inset">Content</SidebarInset>,
    );
    const inset = container.querySelector('[data-slot="sidebar-inset"]');
    expect(inset).toHaveClass("custom-inset");
  });

  it("SidebarProvider accepts style prop", async () => {
    const { SidebarProvider } = await import("@/components/ui/sidebar");
    const { container } = render(
      <SidebarProvider style={{ backgroundColor: "red" }}>
        <div>Content</div>
      </SidebarProvider>,
    );
    const wrapper = container.querySelector('[data-slot="sidebar-wrapper"]');
    expect(wrapper?.getAttribute("style")).toContain("background-color");
  });
});
