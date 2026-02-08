import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import Toast from "./Toast";

const BookingModal = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    site: "",
  });

  // ✅ 1. Add Honeypot state to catch bots
  const [confirmPhone, setConfirmPhone] = useState("");

  const [status, setStatus] = useState("idle");
  const [toastMessage, setToastMessage] = useState("");

  const closeBtnRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get("/properties/");
        const allProperties = response.data.results || response.data;

        const activeProperties = Array.isArray(allProperties)
          ? allProperties.filter((p) => p.status === "Available")
          : [];
        setProperties(activeProperties);
      } catch (error) {
        console.error("Failed to load properties for booking", error);
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    const dateStr = e.target.value;
    if (!dateStr) return;

    const selectedDate = new Date(dateStr);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek !== 3 && dayOfWeek !== 6) {
      setStatus("error");
      setToastMessage(
        "Site visits are only available on Wednesdays and Saturdays.",
      );
      setFormData({ ...formData, date: "" });
      return;
    }
    setFormData({ ...formData, date: dateStr });
  };

  const handleSubmit = async () => {
    // ✅ 2. If the bot fills this hidden field, stop the request silently
    if (confirmPhone) {
      return;
    }

    if (
      !formData.firstName ||
      !formData.phone ||
      !formData.date ||
      !formData.site
    ) {
      setStatus("error");
      setToastMessage("Please fill in all required fields.");
      return;
    }

    const isValidProperty = properties.some(
      (prop) =>
        prop.title.toLowerCase().trim() === formData.site.toLowerCase().trim(),
    );

    if (!isValidProperty) {
      setStatus("error");
      setToastMessage("Please select a valid property from the list.");
      return;
    }

    setStatus("sending");
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        visit_date: formData.date,
        property_name: formData.site,
        status: "Pending",
      };

      const response = await api.post("/bookings/", payload);

      if (response.status === 201 || response.status === 200) {
        setStatus("success");
        setToastMessage("Booking scheduled successfully!");

        if (closeBtnRef.current) {
          closeBtnRef.current.click();
        }

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          date: "",
          site: "",
        });
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      setStatus("error");
      setToastMessage("Failed to save booking. Please try again.");
    }
  };

  return (
    <>
      <Toast
        status={status}
        message={toastMessage}
        onClose={() => setStatus("idle")}
      />

      <div className="modal fade" tabIndex="-1" id="booking-Modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Schedule Visit</h5>
              <button
                ref={closeBtnRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => e.target.blur()}
              ></button>
            </div>

            <div className="modal-body">
              <form id="bookingForm" onSubmit={(e) => e.preventDefault()}>
                {/* ✅ 3. Hidden field humans won't see, but bots will fill */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input
                    type="text"
                    name="confirm_phone_field"
                    value={confirmPhone}
                    onChange={(e) => setConfirmPhone(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    id="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="row mb-3">
                  <div className="form-floating col">
                    <input
                      id="date"
                      type="date"
                      className="form-control"
                      placeholder="Pick a desired date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleDateChange}
                      onFocus={(e) => e.target.showPicker()}
                    />
                    <label className="mx-2 mb-2" htmlFor="date">
                      Wed/Sat Only
                    </label>
                  </div>

                  <div className="form-floating col">
                    <input
                      className="form-control"
                      list="propertyOptions"
                      id="site"
                      placeholder="Type to search..."
                      value={formData.site}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <datalist id="propertyOptions">
                      {properties.map((prop) => (
                        <option key={prop.id} value={prop.title} />
                      ))}
                    </datalist>
                    <label className="mx-2 mb-2" htmlFor="site">
                      Select Site
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleSubmit}
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
