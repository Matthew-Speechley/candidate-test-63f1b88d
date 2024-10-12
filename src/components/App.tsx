import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import styles from "./App.module.scss";
import CharacterCard from "./CharacterCard/CharacterCard";
import FilterMenu from "./FilterMenu/FilterMenu";

interface Character {
    name: string;
    category: string;
    description: string;
    significanceIndex: number;
    avatar: string;
}

export function App() {
    const [characterList, setCharacterList] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [orderBy, setOrderBy] = useState<string>("Significance");

    useEffect(() => {
        const fetchCharacterList = async () => {
            try {
                // 2 second delay, to demonstrate loading state
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const response = await fetch("/characters.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCharacterList(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCharacterList();
    }, []);

    const categories = Array.from(new Set(characterList.map((character) => character.category)));
    const orderByOptions = ["Significance", "Alphabetical"];

    const filteredCharacters = selectedCategory
        ? characterList.filter((character) => character.category === selectedCategory)
        : characterList;

    const sortedBySignificance = [...filteredCharacters].sort((a, b) => {
        return a.significanceIndex - b.significanceIndex;
    });

    const sortedAlphabetically = [...filteredCharacters].sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    const returnedCharacters =
        orderBy === "Significance" ? sortedBySignificance : sortedAlphabetically;

    return (
        <div className={styles.App}>
            <header className={styles["App-header"]}>
                <img src={logo} className={styles["App-logo"]} alt="logo" />
                <h1 className="App-title">Lord of the Rings Character Index</h1>
            </header>

            <section className={styles["App-content"]}>
                {loading && <h2 className={styles["App-loading"]}>Gathering the fellowship...</h2>}
                {error && <h2>Error! The gates of Moria have closed on this request...</h2>}

                {!loading && !error && (
                    <FilterMenu
                        selectedCategory={selectedCategory}
                        categories={categories}
                        orderBy={orderBy}
                        orderByOptions={orderByOptions}
                        setSelectedCategory={setSelectedCategory}
                        setOrderBy={setOrderBy}
                    />
                )}

                <div className={styles["App-cardList"]}>
                    {returnedCharacters.map((character: Character) => (
                        <CharacterCard
                            key={character.name}
                            name={character.name}
                            category={character.category}
                            description={character.description}
                            image={character.avatar}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
