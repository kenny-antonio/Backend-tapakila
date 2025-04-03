BEGIN;
    CREATE TYPE reservation_status as ENUM('pending', 'confirmed', 'canceled');
COMMIT;

CREATE TABLE IF NOT EXISTS reservations (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id int REFERENCES events(id) ON DELETE CASCADE,
    quantity int NOT NULL,
    status reservation_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);