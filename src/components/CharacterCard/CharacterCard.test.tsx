import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

describe("CharacterCard Component", () => {
    const defaultProps = {
        name: "Gandalf",
        category: "wizard",
        description: "A wise wizard known for his guidance.",
        image: "gandalf.jpg"
    };

    it("renders correctly with provided props", () => {
        render(<CharacterCard {...defaultProps} />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(defaultProps.name);
        expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
            defaultProps.category.charAt(0).toUpperCase() + defaultProps.category.slice(1)
        );
        expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
        const image = screen.getByAltText(defaultProps.name);
        expect(image).toHaveAttribute("src", `/characters/${defaultProps.image}`);
        expect(image).toHaveAttribute("height", "80");
        expect(image).toHaveAttribute("width", "80");
    });
});
