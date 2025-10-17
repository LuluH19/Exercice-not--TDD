
import { describe, test, expect } from "@jest/globals"


describe('Panier E-commerce - TDD', () => {
    test('devrait créer un panier vide', () => {
        const panier = new Panier();
        expect(panier.getNombreProduits()).toBe(0);
    });
    
});