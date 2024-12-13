import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.cardNumber || formData.cardNumber.length !== 16)
      newErrors.cardNumber = "Valid 16-digit card number is required.";
    if (
      !formData.expiryDate ||
      !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiryDate)
    )
      newErrors.expiryDate = "Valid expiry date (MM/YY) is required.";
    if (!formData.cvv || formData.cvv.length !== 3)
      newErrors.cvv = "Valid 3-digit CVV is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Order placed successfully!");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="w-full max-w-[600px] mx-auto pt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block font-bold">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          ></textarea>
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block font-bold">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            maxLength="16"
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-sm">{errors.cardNumber}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block font-bold">Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {errors.expiryDate && (
              <p className="text-red-600 text-sm">{errors.expiryDate}</p>
            )}
          </div>

          <div>
            <label className="block font-bold">CVV</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              maxLength="3"
            />
            {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-md font-bold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
