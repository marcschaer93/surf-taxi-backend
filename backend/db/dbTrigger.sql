-- Define a trigger function for handling join request notifications
CREATE OR REPLACE FUNCTION notify_join_request()
RETURNS TRIGGER AS $$
DECLARE
    notification_message TEXT := 'You have a new join request for your trip.';
    sender_username TEXT := NEW.username;
    recipient_username TEXT := (SELECT owner FROM trips WHERE id = NEW.trip_id);
BEGIN
    INSERT INTO notifications (sender_username, recipient_username, message, timestamp, is_read, trip_id, is_join_request, is_approval, email_contact)
    VALUES (sender_username, recipient_username, notification_message, CURRENT_TIMESTAMP, FALSE, NEW.trip_id, TRUE, FALSE, FALSE);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Define a trigger function for handling approval notifications
CREATE OR REPLACE FUNCTION notify_approval()
RETURNS TRIGGER AS $$
DECLARE
    notification_message TEXT := 'Your seat reservation has been confirmed.';
    sender_username TEXT := (SELECT owner FROM trips WHERE id = NEW.trip_id);
    recipient_username TEXT := NEW.username;
BEGIN
    INSERT INTO notifications (sender_username, recipient_username, message, timestamp, is_read, trip_id, is_join_request, is_approval, email_contact)
    VALUES (sender_username, recipient_username, notification_message, CURRENT_TIMESTAMP, FALSE, NEW.trip_id, FALSE, TRUE, FALSE);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Define a trigger function for handling rejection notifications
CREATE OR REPLACE FUNCTION notify_rejection()
RETURNS TRIGGER AS $$
DECLARE
    notification_message TEXT := 'Your trip join request has been declined.';
    sender_username TEXT := (SELECT owner FROM trips WHERE id = NEW.trip_id);
    recipient_username TEXT := NEW.username;
BEGIN
    INSERT INTO notifications (sender_username, recipient_username, message, timestamp, is_read, trip_id, is_join_request, is_approval, email_contact)
    VALUES (sender_username, recipient_username, notification_message, CURRENT_TIMESTAMP, FALSE, NEW.trip_id, FALSE, TRUE, FALSE);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Define a trigger function for handling pending notifications
CREATE OR REPLACE FUNCTION notify_pending()
RETURNS TRIGGER AS $$
DECLARE
    notification_message TEXT := 'Your trip join request is pending approval.';
    sender_username TEXT := (SELECT owner FROM trips WHERE id = NEW.trip_id);
    recipient_username TEXT := NEW.username;
BEGIN
    INSERT INTO notifications (sender_username, recipient_username, message, timestamp, is_read, trip_id, is_join_request, is_approval, email_contact)
    VALUES (sender_username, recipient_username, notification_message, CURRENT_TIMESTAMP, FALSE, NEW.trip_id, TRUE, FALSE, FALSE);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;





-- Create triggers for handling join requests, approvals, and rejections
CREATE TRIGGER notify_join_request_trigger
AFTER INSERT ON passengers
FOR EACH ROW
WHEN (NEW.reservation_status = 'requested')
EXECUTE FUNCTION notify_join_request();

CREATE TRIGGER notify_pending_trigger
AFTER UPDATE ON passengers
FOR EACH ROW
WHEN (NEW.reservation_status = 'pending')
EXECUTE FUNCTION notify_pending();

CREATE TRIGGER notify_approval_trigger
AFTER UPDATE ON passengers
FOR EACH ROW
WHEN (NEW.reservation_status = 'confirmed')
EXECUTE FUNCTION notify_approval();

CREATE TRIGGER notify_rejection_trigger
AFTER UPDATE ON passengers
FOR EACH ROW
WHEN (NEW.reservation_status = 'rejected')
EXECUTE FUNCTION notify_rejection();


-- [i] reservation status: 

-- Requested: "You've requested to join this trip."
-- Pending: "You're in touch! Waiting for organizer approval."
-- Confirmed: "Seat secured! Your spot on this trip is confirmed."
-- Rejected: "Request declined. Your spot on this trip is not confirmed."

