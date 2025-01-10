export type Category = 'Food' | 'Beverage' | 'Condiment';

export interface Item {
    name: string;
    quantity: number;
    category: Category;
}

export class ItemController {
    private items: Item[] = [];

    addItem(name: string, quantity: string, category: Category): void {
        const parsedQuantity = parseInt(quantity, 10); // Parse the quantity to an integer
        if (name && !isNaN(parsedQuantity)) { // Check if the name is not empty and the quantity is a number
            const newItem: Item = { name, quantity: parsedQuantity, category }; // Create a new item
            this.items.push(newItem); // Add the item to the items array
        } else {
            alert('Name and quantity are required, and quantity must be a number.');
        }
    }

    removeItem(index: number): void {
        this.items.splice(index, 1);  // Remove the item based on the index
    }

    getItems(): Item[] { // Getter function to get the items in the array
        return this.items;
    }
}