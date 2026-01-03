import { useState } from "react";
import { z } from "zod";

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  campus: z.string().trim().min(2, "Campus is required").max(100),
  level: z.string().min(1, "Please select your level"),
  expectations: z.string().trim().max(1000).optional(),
});

const SignupForm = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "", campus: "", level: "", expectations: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => { fieldErrors[err.path[0]] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <section id="register" className="relative py-20 px-4" style={{ backgroundColor: "hsl(120 40% 6%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-12 border border-border">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-ltc-lime flex items-center justify-center">
              <svg className="w-10 h-10 text-ltc-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="ltc-heading text-3xl md:text-4xl text-ltc-lime mb-4">Registration Successful!</h2>
            <p className="text-muted-foreground text-lg mb-8">Thank you for registering for the Leadership Training Conference 2026.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="relative py-20 px-4" style={{ backgroundColor: "hsl(120 40% 6%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="ltc-heading text-3xl md:text-5xl text-ltc-lime mb-4">Register for LTC 2026</h2>
          <p className="text-muted-foreground text-lg">Join us for the Leadership Training Conference</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-12 border border-border" noValidate>
          <div className="mb-6">
            <label htmlFor="fullName" className="ltc-label">Full Name *</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="ltc-input" placeholder="Enter your full name" required />
            {errors.fullName && <p className="ltc-error">{errors.fullName}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="ltc-label">Email Address *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="ltc-input" placeholder="your.email@example.com" required />
            {errors.email && <p className="ltc-error">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="campus" className="ltc-label">Campus *</label>
            <input type="text" id="campus" name="campus" value={formData.campus} onChange={handleChange} className="ltc-input" placeholder="e.g., Federal University Lafia" required />
            {errors.campus && <p className="ltc-error">{errors.campus}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="level" className="ltc-label">Level *</label>
            <select id="level" name="level" value={formData.level} onChange={handleChange} className="ltc-select" required>
              <option value="">Select your level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="associate">Associate</option>
            </select>
            {errors.level && <p className="ltc-error">{errors.level}</p>}
          </div>
          <div className="mb-8">
            <label htmlFor="expectations" className="ltc-label">Expectations (Optional)</label>
            <textarea id="expectations" name="expectations" value={formData.expectations} onChange={handleChange} className="ltc-input min-h-[120px] resize-y" placeholder="What do you hope to gain from LTC 2026?" />
          </div>
          <button type="submit" disabled={isSubmitting} className="ltc-button w-full text-lg flex items-center justify-center gap-3">
            {isSubmitting ? "Submitting..." : "Register Now"}
          </button>
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="ltc-price-badge ltc-price-red px-6 py-3 text-center rounded-lg">Students: ₦5,000</div>
              <div className="ltc-price-badge ltc-price-lime px-6 py-3 text-center rounded-lg">Associates: ₦10,000</div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
