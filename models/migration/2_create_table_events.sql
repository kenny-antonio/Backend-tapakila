CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    organizer_id INT REFERENCES users(id) ON DELETE SET NULL,
    standard_price numeric NOT NULL,
    standard_quantity int NOT NULL,
    vip_price numeric NOT NULL,
    early_bird_quantity INT NOT NULL,
    early_bird_price numeric NOT NULL,
    vip_quantity INT NOT NULL,
    image_url VARCHAR NOT NULL,
    category VARCHAR DEFAULT 'recent',
    type VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
