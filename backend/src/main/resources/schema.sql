CREATE TABLE addresses (
    id            INTEGER NOT NULL,
    street_name   VARCHAR2 (255) NOT NULL,
    street_number VARCHAR2 (50) NOT NULL,
    zip_code      VARCHAR2 (6) NOT NULL,
    location      VARCHAR2 (255) NOT NULL,
    country       VARCHAR2 (255) NOT NULL,
    users_id      INTEGER NOT NULL
  );

CREATE UNIQUE INDEX addresses__IDX ON addresses (
    users_id ASC
  );

ALTER TABLE addresses ADD CONSTRAINT addresses_PK PRIMARY KEY (id);


CREATE TABLE images (
    id          INTEGER NOT NULL,
    image_uri   VARCHAR2 (255) NOT NULL,
    products_id INTEGER NOT NULL
  );

ALTER TABLE images ADD CONSTRAINT images_PK PRIMARY KEY (id, products_id);


CREATE TABLE order_product (
    id              INTEGER NOT NULL,
    item_quantity   INTEGER NOT NULL,
    price           REAL NOT NULL,
    orders_id       INTEGER NOT NULL,
    orders_users_id INTEGER NOT NULL,
    products_id     INTEGER NOT NULL
  );

ALTER TABLE order_product ADD CONSTRAINT order_product_PK PRIMARY KEY (id, orders_id, orders_users_id, products_id) ;


CREATE TABLE orders (
    id             INTEGER NOT NULL,
    order_date     DATE NOT NULL,
    payment_method VARCHAR2 (255) NOT NULL,
    users_id       INTEGER NOT NULL
  ) ;

ALTER TABLE orders ADD CONSTRAINT orders_PK PRIMARY KEY (id, users_id);

CREATE TABLE product_restock (
    id             INTEGER NOT NULL,
    purchase_price REAL NOT NULL,
    "date"         DATE NOT NULL,
    quantity       INTEGER NOT NULL,
    products_id    INTEGER NOT NULL
  );
ALTER TABLE product_restock ADD CONSTRAINT product_restock_PK PRIMARY KEY (id, products_id) ;


CREATE TABLE products (
    id                       INTEGER NOT NULL,
    name                     VARCHAR2 (100) NOT NULL,
    producer                 VARCHAR2 (100) NOT NULL,
    description              VARCHAR2 (1000),
    category                 VARCHAR2 (100) NOT NULL,
    number_of_items_in_stock INTEGER NOT NULL,
    purhase_price            REAL NOT NULL,
    retail_price             REAL NOT NULL
  );

ALTER TABLE products ADD CONSTRAINT products_PK PRIMARY KEY (id);

CREATE TABLE shopping_cart_products (
    id                INTEGER NOT NULL,
    quantity          INTEGER NOT NULL,
    products_id       INTEGER NOT NULL,
    shopping_carts_id INTEGER NOT NULL
  );
ALTER TABLE shopping_cart_products ADD CONSTRAINT shopping_cart_products_PK 

PRIMARY KEY (id, products_id, shopping_carts_id);

CREATE TABLE shopping_carts (
    id              INTEGER NOT NULL,
    creation_date   DATE NOT NULL,
    number_of_items INTEGER NOT NULL,
    id1             INTEGER NOT NULL,
    users_id        INTEGER NOT NULL
  );

CREATE UNIQUE INDEX shopping_carts__IDX ON shopping_carts (
    users_id ASC
  );

ALTER TABLE shopping_carts ADD CONSTRAINT shopping_carts_PK PRIMARY KEY (id);

CREATE TABLE users (
    id              INTEGER NOT NULL,
    login           VARCHAR2 (100) NOT NULL,
    password        VARCHAR2 (255) NOT NULL,
    name            VARCHAR2 (50) NOT NULL,
    surname         VARCHAR2 (50) NOT NULL,
    phone_number    VARCHAR2 (15) NOT NULL,
    type            VARCHAR2 (20) NOT NULL,
    birth_date      DATE,
    pesel           VARCHAR2 (11),
    employment_date DATE
  );

ALTER TABLE users ADD CONSTRAINT users_PK PRIMARY KEY (id) ;

ALTER TABLE addresses ADD CONSTRAINT addresses_users_FK FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE images ADD CONSTRAINT images_products_FK FOREIGN KEY (products_id) REFERENCES products (id);

ALTER TABLE order_product ADD CONSTRAINT order_product_orders_FK FOREIGN KEY (orders_id, orders_users_id) REFERENCES orders (id, users_id);

ALTER TABLE order_product ADD CONSTRAINT order_product_products_FK FOREIGN KEY (products_id) REFERENCES products (id);

ALTER TABLE orders ADD CONSTRAINT orders_users_FK FOREIGN KEY (users_id) REFERENCES users (id);

ALTER TABLE product_restock ADD CONSTRAINT product_restock_products_FK FOREIGN KEY (products_id) REFERENCES products (id);

ALTER TABLE shopping_cart_products ADD CONSTRAINT shopping_cart_products_products_FK FOREIGN KEY (products_id) REFERENCES products (id);

ALTER TABLE shopping_cart_products ADD CONSTRAINT shopping_cart_products_shopping_carts_FK FOREIGN KEY (shopping_carts_id) REFERENCES shopping_carts (id);

ALTER TABLE shopping_carts ADD CONSTRAINT shopping_carts_users_FK FOREIGN KEY (users_id) REFERENCES users (id);
