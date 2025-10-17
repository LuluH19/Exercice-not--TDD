
import { describe, test, expect } from "@jest/globals"

class Panier {
    getNombreProduits(): number {
        return 0;
    }
}

describe('Panier E-commerce - TDD', () => {
    test('devrait créer un panier vide', () => {
        const panier = new Panier();
        expect(panier.getNombreProduits()).toBe(0);
    });
});