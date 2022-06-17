package pl.polsl.shop.product;

public enum ProductCategory {
    ARRANGEMENT ("Aranżacja"), BUILDING ("Budowa"), GARDEN ("Ogród"),
    INSTALLATION ("Instalacja"), TOOLS_AND_ARTICLES ("Narzędzia i artykuły");

    private final String name;

    private ProductCategory(String name) {
        this.name = name;
    }

    public boolean equalsName(String otherName) {
        return name.equals(otherName);
    }
    public String toString() {
        return this.name;
    }
}