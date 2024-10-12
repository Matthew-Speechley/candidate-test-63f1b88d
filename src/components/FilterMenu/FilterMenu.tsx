import React from "react";

import styles from "./FilterMenu.module.scss";

interface FilterMenuProps {
    selectedCategory: string;
    categories: string[];
    orderBy: string;
    orderByOptions: string[];
    setSelectedCategory: (category: string) => void;
    setOrderBy: (orderBy: string) => void;
}

export default function FilterMenu({
    selectedCategory,
    categories,
    orderBy,
    orderByOptions,
    setSelectedCategory,
    setOrderBy
}: FilterMenuProps) {
    return (
        <div className={styles["FilterMenu"]}>
            <div className={styles["Filter"]}>
                <label htmlFor="category-select">Category</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles["Filter"]}>
                <label htmlFor="order-select">Order by</label>
                <select
                    id="order-select"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                >
                    {orderByOptions.map((orderBy) => (
                        <option key={orderBy} value={orderBy}>
                            {orderBy}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
