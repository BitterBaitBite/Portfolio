import { render, screen, within } from "@testing-library/react";
import { ProjectAdmin } from "./ProjectAdmin";
import { Project, Tag } from "@/types";

const mockToken = "test_token";
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Test Project",
    subtitle: "A test project",
    brief: "Brief description",
    description: "Full description",
    url: "https://example.com",
    thumbnail: "https://example.com/thumb.jpg",
    image: "https://example.com/image.jpg",
    tags: [],
  },
];
const mockTags: Tag[] = [
  {
    id: "tag1",
    name: "React",
    category: "framework" as const,
  },
];

describe("ProjectAdmin", () => {
  const mockOnRefresh = jest.fn();

  it("should render the projects section", () => {
    render(
      <ProjectAdmin
        token={mockToken}
        projects={mockProjects}
        tags={mockTags}
        onRefresh={mockOnRefresh}
      />,
    );

    expect(screen.getByText("Proyectos")).toBeInTheDocument();
  });

  it("should display projects in the select dropdown", () => {
    render(
      <ProjectAdmin
        token={mockToken}
        projects={mockProjects}
        tags={mockTags}
        onRefresh={mockOnRefresh}
      />,
    );

    const selectDropdown = screen.getByRole("combobox");
    expect(selectDropdown).toBeInTheDocument();

    const { getByText } = within(selectDropdown);
    expect(getByText("Test Project")).toBeInTheDocument();
  });

  it("should show create new option in dropdown", () => {
    render(
      <ProjectAdmin
        token={mockToken}
        projects={mockProjects}
        tags={mockTags}
        onRefresh={mockOnRefresh}
      />,
    );

    const selectDropdown = screen.getByRole("combobox");
    expect(selectDropdown).toBeInTheDocument();

    const { getByText } = within(selectDropdown);
    expect(getByText("Crear proyecto nuevo")).toBeInTheDocument();
  });

  it("should render input fields", () => {
    render(
      <ProjectAdmin
        token={mockToken}
        projects={mockProjects}
        tags={mockTags}
        onRefresh={mockOnRefresh}
      />,
    );

    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo")).toBeInTheDocument();
    expect(screen.getByText("Resumen breve")).toBeInTheDocument();
    expect(screen.getByText("Descripción")).toBeInTheDocument();
  });

  it("should render save button", () => {
    render(
      <ProjectAdmin
        token={mockToken}
        projects={mockProjects}
        tags={mockTags}
        onRefresh={mockOnRefresh}
      />,
    );

    expect(screen.getByText("Crear proyecto")).toBeInTheDocument();
  });
});
