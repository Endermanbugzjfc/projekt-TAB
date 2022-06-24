CREATE TABLE addresses (
    id            INTEGER NOT NULL,
    street_name   VARCHAR2 (255) NOT NULL,
    street_number VARCHAR2 (50) NOT NULL,
    zip_code      VARCHAR2 (6) NOT NULL,
    location      VARCHAR2 (255) NOT NULL,
    country       VARCHAR2 (255) NOT NULL,
    user_id       INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE images (
    id          INTEGER NOT NULL,
    image_uri   VARCHAR2 (255) NOT NULL,
    product_id  INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE order_product (
    id              INTEGER NOT NULL,
    item_quantity   INTEGER NOT NULL,
    price           REAL NOT NULL,
    order_id        INTEGER,
    product_id      INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE orders (
    id             INTEGER NOT NULL,
    order_date     DATE NOT NULL,
    payment_method VARCHAR (255) NOT NULL,
    user_id        INTEGER,
    PRIMARY KEY (id)
  ) ;

CREATE TABLE product_restock (
    id             INTEGER NOT NULL,
    purchase_price REAL NOT NULL,
    restock_date         DATE NOT NULL,
    quantity       INTEGER NOT NULL,
    PRIMARY KEY (id)
  );

CREATE TABLE products (
    id                       INTEGER NOT NULL,
    name                     VARCHAR2 (100) NOT NULL,
    producer                 VARCHAR2 (100) NOT NULL,
    description              VARCHAR2 (1000),
    category                 VARCHAR2 (100) NOT NULL,
    number_of_items_in_stock INTEGER NOT NULL,
    purchase_price           REAL NOT NULL,
    retail_price             REAL NOT NULL,
    product_id               INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE shopping_cart_products (
    id                INTEGER NOT NULL,
    quantity          INTEGER NOT NULL,
    product_id        INTEGER,
    shopping_cart_id  INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE shopping_carts (
    id              INTEGER NOT NULL,
    creation_date   DATE NOT NULL,
    number_of_items INTEGER NOT NULL,
    user_id         INTEGER,
    PRIMARY KEY (id)
  );

CREATE TABLE users (
    id              INTEGER NOT NULL,
    user_name       VARCHAR2 (100) NOT NULL,
    password        VARCHAR2 (255) NOT NULL,
    legal_name      VARCHAR2 (50) NOT NULL,
    surname         VARCHAR2 (50) NOT NULL,
    phone_number    VARCHAR2 (15) NOT NULL,
    type            VARCHAR2 (20) NOT NULL,
    birth_date      DATE,
    pesel           VARCHAR2 (11),
    employment_date DATE,
    PRIMARY KEY (id)
  );

ALTER TABLE addresses ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE images ADD FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE order_product ADD FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE order_product ADD FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE products ADD FOREIGN KEY (product_id) REFERENCES product_restock (id);

ALTER TABLE shopping_cart_products ADD FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE shopping_cart_products ADD FOREIGN KEY (shopping_cart_id) REFERENCES shopping_carts (id);

ALTER TABLE shopping_carts ADD FOREIGN KEY (user_id) REFERENCES users (id);
