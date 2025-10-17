import { describe, test, expect } from "@jest/globals"

// INTERFACES & TYPES


interface Produit {
    nom: string;
    prix: number;
}

// CLASSE PANIER (CODE REFACTORISÉ)
class Panier {
    private static readonly SEUIL_REDUCTION = 100;
    private static readonly TAUX_REDUCTION = 0.10;
    
    private produits: Produit[] = [];

    ajouterProduit(nom: string, prix: number): void {
        this.produits.push({ nom, prix });
    }


    getNombreProduits(): number {
        return this.produits.length;
    }

    
    calculerTotal(): number {
        const totalBrut = this.calculerTotalBrut();
        return this.appliquerReduction(totalBrut);
    }

    getProduits(): Produit[] {
        return this.produits;
    }

    private calculerTotalBrut(): number {
        return this.produits.reduce((total, produit) => total + produit.prix, 0);
    }

    private appliquerReduction(total: number): number {
        if (total > Panier.SEUIL_REDUCTION) {
            return total * (1 - Panier.TAUX_REDUCTION);
        }
        return total;
    }
}


// TESTS UNITAIRES

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

    test('ne devrait PAS appliquer de réduction si le total est exactement 100€', () => {
        const panier = new Panier();
        panier.ajouterProduit('Produit 1', 50);
        panier.ajouterProduit('Produit 2', 50);
        expect(panier.calculerTotal()).toBe(100);
    });

    test('devrait appliquer une réduction de 10% si le total dépasse 100€', () => {
        const panier = new Panier();
        panier.ajouterProduit('Produit 1', 60);
        panier.ajouterProduit('Produit 2', 60);
        // Total = 120€, avec réduction 10% = 120 * 0.9 = 108€
        expect(panier.calculerTotal()).toBe(108);
    });

    test('devrait appliquer une réduction de 10% pour un montant élevé', () => {
        const panier = new Panier();
        panier.ajouterProduit('Ordinateur', 800);
        panier.ajouterProduit('Souris', 50);
        // Total = 850€, avec réduction 10% = 850 * 0.9 = 765€
        expect(panier.calculerTotal()).toBe(765);
    });
});
