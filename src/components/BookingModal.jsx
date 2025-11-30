const BookingModal = () => {
  return (
    <div className="modal fade" tabIndex="-1" id="booking-Modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Schedule Visit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form id="bookingForm" onSubmit={(e) => e.preventDefault()}>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    id="firstName"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    id="lastName"
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
                />
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  id="telephone"
                />
              </div>

              <div className="row mb-3">
                <div className="form-floating col">
                  <input
                    id="datePicker"
                    type="date"
                    className="form-control"
                    placeholder="Pick a desired date"
                    onFocus={(e) => e.target.showPicker()}
                  />
                  <label className="mx-2 mb-2" htmlFor="datePicker">
                    Schedule Date
                  </label>
                </div>

                <div className="form-floating col">
                  <select
                    id="destinationSelector"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sites
                    </option>
                    <option value="1">Royal Garden Phase 5</option>
                    <option value="1">Kijani Garden Malindi</option>
                    <option value="2">Unity Garden Makutano</option>
                    <option value="3">Amani Garden Malindi</option>
                    <option value="4">Royal Garden IV</option>
                    <option value="5">Royal Garden III</option>
                  </select>
                  <label className="mx-2 mb-2" htmlFor="destinationSelector">
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
              data-bs-dismiss="modal"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
