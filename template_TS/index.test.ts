import { describe, test, expect } from "@jest/globals"

class Panier {
    private produits: Array<{nom: string, prix: number}> = [];

    ajouterProduit(nom: string, prix: number): void {
        this.produits.push({nom, prix});
    }

    getNombreProduits(): number {
        return this.produits.length;
    }

    calculerTotal(): number {
        return this.produits.reduce((total, produit) => total + produit.prix, 0);
    }

}

describe('Panier E-commerce - TDD', () => {
    test('devrait créer un panier vide', () => {
        const panier = new Panier();
        expect(panier.getNombreProduits()).toBe(0);
    });
    
    test('devrait ajouter un produit au panier', () => {
        const panier = new Panier();
        panier.ajouterProduit('Livre', 15);
        expect(panier.getNombreProduits()).toBe(1);
    });

    test('devrait calculer un total de 0 pour un panier vide', () => {
        const panier = new Panier();
        expect(panier.calculerTotal()).toBe(0);
    });

    test('devrait calculer le total avec un seul produit', () => {
        const panier = new Panier();
        panier.ajouterProduit('Livre', 20);
        expect(panier.calculerTotal()).toBe(20);
    });

    test('devrait calculer le total avec plusieurs produits', () => {
        const panier = new Panier();
        panier.ajouterProduit('Livre', 20);
        panier.ajouterProduit('Stylo', 5);
        panier.ajouterProduit('Cahier', 10);
        expect(panier.calculerTotal()).toBe(35);
    });
});