BEGIN;
    CREATE TYPE ticket_type as ENUM('Standard', 'VIP', 'Early Bird');
COMMIT;

CREATE TABLE IF NOT EXISTS tickets (
    id BIGSERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    type ticket_type NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    buying_limit INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
