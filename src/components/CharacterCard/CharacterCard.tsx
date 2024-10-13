import React from "react";

import styles from "./CharacterCard.module.scss";

interface CharacterCardProps {
    name: string;
    category: string;
    description: string;
    image: string;
}

export default function CharacterCard({ name, category, description, image }: CharacterCardProps) {
    return (
        <div className={styles["CharacterCard"]}>
            <div className={styles["CharacterCard-image"]}>
                <img
                    src={`/characters/${image}`}
                    alt={name}
                    loading="lazy"
                    height={80}
                    width={80}
                />
            </div>
            <div className={styles["CharacterCard-information"]}>
                <h1>{name}</h1>
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
}
