import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterMenu from "./FilterMenu";

describe("FilterMenu Component", () => {
    const mockSetSelectedCategory = jest.fn();
    const mockSetOrderBy = jest.fn();

    const defaultProps = {
        selectedCategory: "",
        categories: ["wizard", "hobbit", "elf"],
        orderBy: "Significance",
        orderByOptions: ["Alphabetical", "Significance"],
        setSelectedCategory: mockSetSelectedCategory,
        setOrderBy: mockSetOrderBy
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders correctly with provided categories and order by options", () => {
        render(<FilterMenu {...defaultProps} />);

        expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Order by/i)).toBeInTheDocument();

        expect(screen.getByRole("option", { name: /All/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /Wizard/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /Hobbit/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /Elf/i })).toBeInTheDocument();

        expect(screen.getByRole("option", { name: /Alphabetical/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /Significance/i })).toBeInTheDocument();
    });

    it("calls setSelectedCategory when category is changed", () => {
        render(<FilterMenu {...defaultProps} />);

        const categorySelect = screen.getByLabelText(/Category/i);

        fireEvent.change(categorySelect, { target: { value: "wizard" } });

        expect(mockSetSelectedCategory).toHaveBeenCalledWith("wizard");
    });

    it("calls setOrderBy when order by option is changed", () => {
        render(<FilterMenu {...defaultProps} />);

        const orderBySelect = screen.getByLabelText(/Order by/i);

        fireEvent.change(orderBySelect, { target: { value: "Alphabetical" } });

        expect(mockSetOrderBy).toHaveBeenCalledWith("Alphabetical");
    });
});
