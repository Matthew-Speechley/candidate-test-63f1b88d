import React from "react";
import { createRoot } from "react-dom/client";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";

declare const global: any;

jest.mock("./CharacterCard/CharacterCard", () => {
    return function MockCharacterCard(props: any) {
        return <div data-testid="character-card">{props.name}</div>;
    };
});

jest.mock("./FilterMenu/FilterMenu", () => {
    return function MockFilterMenu(props: any) {
        return (
            <div>
                <select
                    data-testid="category-select"
                    value={props.selectedCategory}
                    onChange={(e) => props.setSelectedCategory(e.target.value)}
                >
                    {props.categories.map((category: string) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    data-testid="order-select"
                    value={props.orderBy}
                    onChange={(e) => props.setOrderBy(e.target.value)}
                >
                    {props.orderByOptions.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };
});

describe("App Component", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        {
                            name: "Gandalf",
                            category: "Wizard",
                            description: "A wizard",
                            significanceIndex: 1,
                            avatar: "gandalf.png"
                        },
                        {
                            name: "Frodo",
                            category: "Hobbit",
                            description: "A hobbit",
                            significanceIndex: 2,
                            avatar: "frodo.png"
                        },
                        {
                            name: "Legolas",
                            category: "Elf",
                            description: "An elf",
                            significanceIndex: 3,
                            avatar: "legolas.png"
                        }
                    ])
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        const div = document.createElement("div");

        act(() => {
            const root = createRoot(div);
            root.render(<App />);
            root.unmount();
        });
    });

    it("shows loading message initially", () => {
        render(<App />);
        expect(screen.getByText(/Gathering the fellowship.../i)).toBeInTheDocument();
    });

    it("renders characters after loading", async () => {
        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
        });

        expect(screen.getByText("Gandalf")).toBeInTheDocument();
        expect(screen.getByText("Frodo")).toBeInTheDocument();
        expect(screen.getByText("Legolas")).toBeInTheDocument();
    });

    it("renders error message on fetch failure", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404
            })
        ) as jest.Mock;

        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
        });

        expect(
            screen.getByText(/Error! The gates of Moria have closed on this request.../i)
        ).toBeInTheDocument();
    });

    it("filters characters by category", async () => {
        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
        });

        fireEvent.change(screen.getByTestId("category-select"), { target: { value: "Hobbit" } });

        expect(screen.getByText("Frodo")).toBeInTheDocument();
        expect(screen.queryByText("Gandalf")).not.toBeInTheDocument();
        expect(screen.queryByText("Legolas")).not.toBeInTheDocument();
    });

    it("orders characters by significance", async () => {
        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
        });

        fireEvent.change(screen.getByTestId("order-select"), { target: { value: "Significance" } });

        const characters = screen.getAllByTestId("character-card");
        expect(characters[0]).toHaveTextContent("Gandalf");
        expect(characters[1]).toHaveTextContent("Frodo");
        expect(characters[2]).toHaveTextContent("Legolas");
    });

    it("orders characters alphabetically", async () => {
        await act(async () => {
            render(<App />);
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
        });

        fireEvent.change(screen.getByTestId("order-select"), { target: { value: "Alphabetical" } });

        const characters = screen.getAllByTestId("character-card");
        expect(characters[0]).toHaveTextContent("Frodo");
        expect(characters[1]).toHaveTextContent("Gandalf");
        expect(characters[2]).toHaveTextContent("Legolas");
    });
});
