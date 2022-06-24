package pl.polsl.shop.product;

public enum ProductCategory {
    ARRANGEMENT ("Aranzacja"), BUILDING ("Budowa"), GARDEN ("Ogrod"),
    INSTALLATION ("Instalacja"), TOOLS_AND_ARTICLES ("Narzedzia");

    private final String otherName;

    private ProductCategory(String otherName) {
        this.otherName = otherName;
    }

    public boolean equalsName(String otherName) {
        return this.otherName.equals(otherName);
    }
    public String toString() {
        return this.name() ;
    }
}