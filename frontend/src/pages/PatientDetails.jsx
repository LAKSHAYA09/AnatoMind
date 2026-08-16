import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientDetails() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",

    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    allergies: [],
    medications: [],
    conditions: [],

    surgeries: "",
    familyHistory: "",
    immunizations: "",
  });

  const [inputValues, setInputValues] = useState({
    allergy: "",
    medication: "",
    condition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTag = (type) => {
    const value = inputValues[type].trim();

    if (!value) return;

    const fieldMap = {
      allergy: "allergies",
      medication: "medications",
      condition: "conditions",
    };

    const field = fieldMap[type];

    if (!formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    }

    setInputValues((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const removeTag = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  const calculateAge = () => {
    if (!formData.dob) return "";

    const birthDate = new Date(formData.dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.dob ||
        !formData.gender
      ) {
        alert("Please fill in all required personal details.");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.phone ||
        !formData.email ||
        !formData.emergencyName ||
        !formData.emergencyPhone
      ) {
        alert("Please fill in all required contact details.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const enterDashboard = () => {
    navigate("/dashboard");
  };

  const steps = [
    {
      number: 1,
      title: "Personal",
      subtitle: "Identity",
    },
    {
      number: 2,
      title: "Contact",
      subtitle: "Details",
    },
    {
      number: 3,
      title: "Medical",
      subtitle: "Profile",
    },
    {
      number: 4,
      title: "Review",
      subtitle: "Profile",
    },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">

      {/* =====================================================
          VIDEO BACKGROUND
      ====================================================== */}

      {/* Blurred full-screen background copy */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0
          h-full w-full
          scale-110
          object-cover
          object-center
          blur-[18px]
          brightness-[0.45]
        "
      >
        <source src="/patient-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark tint over blurred video */}

      <div className="absolute inset-0 bg-black/25" />

      {/* =====================================================
          MAIN VIDEO - FULL VIDEO VISIBLE
      ====================================================== */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0
          h-full w-full
          object-contain
          object-center
          brightness-[1.12]
          contrast-[1.05]
          saturate-[1.08]
        "
      >
        <source src="/patient-bg.mp4" type="video/mp4" />
      </video>

      {/* Very light readability overlay */}

      <div className="absolute inset-0 bg-black/10" />

      {/* Soft side shading */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="relative z-30 flex h-[75px] items-center justify-between px-6 lg:px-12">

        <button
          onClick={() => navigate("/")}
          className="text-left transition hover:opacity-80"
        >
          <h1 className="text-lg font-bold tracking-[0.18em]">
            ANATO<span className="text-red-500">MIND</span>
          </h1>

          <p className="mt-1 font-mono text-[5px] uppercase tracking-[0.25em] text-white/70">
            AI-Powered Anatomy Explorer
          </p>
        </button>

        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/70">
          Patient Onboarding
        </div>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-20 flex h-[calc(100vh-75px)] items-center justify-center px-4 pb-5 lg:px-10">

        <div className="flex h-[min(84vh,720px)] w-full max-w-[1050px] flex-col overflow-hidden rounded-[30px] border border-white/30 bg-black/10 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-[12px]">

          {/* =================================================
              PROGRESS
          ================================================= */}

          <div className="border-b border-white/15 bg-black/10 px-6 py-5 lg:px-10">

            <div className="flex items-center justify-between">

              {steps.map((item, index) => (
                <div
                  key={item.number}
                  className="flex flex-1 items-center"
                >
                  <button
                    onClick={() => {
                      if (item.number < step) {
                        setStep(item.number);
                      }
                    }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[9px] transition ${
                        step === item.number
                          ? "border-red-400 bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.55)]"
                          : step > item.number
                          ? "border-red-400/70 bg-red-500/20 text-red-300"
                          : "border-white/30 bg-black/20 text-white/50"
                      }`}
                    >
                      {step > item.number ? "✓" : item.number}
                    </div>

                    <div className="hidden text-left sm:block">
                      <p
                        className={`font-mono text-[7px] uppercase tracking-[0.18em] ${
                          step === item.number
                            ? "text-red-300"
                            : "text-white/50"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="text-[9px] text-white/45">
                        {item.subtitle}
                      </p>
                    </div>
                  </button>

                  {index !== steps.length - 1 && (
                    <div
                      className={`mx-3 h-px flex-1 ${
                        step > item.number
                          ? "bg-red-400/70"
                          : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}

            </div>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="flex-1 overflow-y-auto px-6 py-7 lg:px-14 lg:py-10">

            {step === 1 && (
              <div className="mx-auto max-w-[750px]">

                <SectionHeader
                  eyebrow="Step 01 / Personal Information"
                  title="Let's start with"
                  highlight="you."
                  description="Tell us the basics so we can create your profile."
                />

                <div className="grid gap-4 md:grid-cols-3">

                  <InputField
                    label="First name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />

                  <InputField
                    label="Middle name"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Optional"
                  />

                  <InputField
                    label="Last name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />

                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">

                  <div>
                    <label className="mb-2 block text-xs text-white/80">
                      Date of birth *
                    </label>

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-white/30 bg-black/20 px-4 text-sm outline-none focus:border-red-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/80">
                      Age
                    </label>

                    <div className="flex h-11 items-center rounded-xl border border-white/20 bg-black/15 px-4 text-sm text-white/70">
                      {calculateAge() || "Auto calculated"}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/80">
                      Gender *
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-white/30 bg-black/30 px-4 text-sm outline-none focus:border-red-400"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                </div>

                <div className="mt-5 max-w-[240px]">

                  <label className="mb-2 block text-xs text-white/80">
                    Blood group
                  </label>

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-white/30 bg-black/30 px-4 text-sm outline-none focus:border-red-400"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>

                </div>

              </div>
            )}

            {step === 2 && (
              <div className="mx-auto max-w-[750px]">

                <SectionHeader
                  eyebrow="Step 02 / Contact Information"
                  title="How can we"
                  highlight="reach you?"
                  description="Add your primary contact and emergency information."
                />

                <div className="grid gap-5 md:grid-cols-2">

                  <InputField
                    label="Primary phone *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />

                  <InputField
                    label="Alternate phone"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    placeholder="Optional"
                  />

                </div>

                <div className="mt-5">

                  <InputField
                    label="Email address *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                </div>

                <div className="mt-5">

                  <label className="mb-2 block text-xs text-white/80">
                    Residential address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="min-h-[85px] w-full resize-none rounded-xl border border-white/30 bg-black/20 p-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
                  />

                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">

                  <SimpleInput
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />

                  <SimpleInput
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />

                  <SimpleInput
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                  />

                </div>

                <div className="mt-8 border-t border-white/15 pt-6">

                  <p className="mb-5 font-mono text-[8px] uppercase tracking-[0.25em] text-red-300">
                    Emergency Contact
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">

                    <SimpleInput
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleChange}
                      placeholder="Contact name *"
                    />

                    <SimpleInput
                      name="emergencyRelationship"
                      value={formData.emergencyRelationship}
                      onChange={handleChange}
                      placeholder="Relationship"
                    />

                    <SimpleInput
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="Phone number *"
                    />

                  </div>

                </div>

              </div>
            )}

            {step === 3 && (
              <div className="mx-auto max-w-[750px]">

                <SectionHeader
                  eyebrow="Step 03 / Medical Profile"
                  title="Your health,"
                  highlight="visualized."
                  description="Add relevant medical information. Leave anything empty if it does not apply."
                />

                <TagInput
                  title="Known allergies"
                  placeholder="Type an allergy"
                  value={inputValues.allergy}
                  onChange={handleInputChange}
                  name="allergy"
                  onAdd={() => addTag("allergy")}
                  tags={formData.allergies}
                  onRemove={(value) =>
                    removeTag("allergies", value)
                  }
                />

                <div className="mt-6">

                  <TagInput
                    title="Current medications"
                    placeholder="Add medication"
                    value={inputValues.medication}
                    onChange={handleInputChange}
                    name="medication"
                    onAdd={() => addTag("medication")}
                    tags={formData.medications}
                    onRemove={(value) =>
                      removeTag("medications", value)
                    }
                  />

                </div>

                <div className="mt-6">

                  <TagInput
                    title="Existing medical conditions"
                    placeholder="Add condition"
                    value={inputValues.condition}
                    onChange={handleInputChange}
                    name="condition"
                    onAdd={() => addTag("condition")}
                    tags={formData.conditions}
                    onRemove={(value) =>
                      removeTag("conditions", value)
                    }
                  />

                </div>

                <div className="mt-6">

                  <label className="mb-2 block text-xs text-white/80">
                    Past surgeries or procedures
                  </label>

                  <textarea
                    name="surgeries"
                    value={formData.surgeries}
                    onChange={handleChange}
                    placeholder="Describe any relevant surgeries or procedures"
                    className="min-h-[75px] w-full resize-none rounded-xl border border-white/30 bg-black/20 p-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
                  />

                </div>

                <div className="mt-5">

                  <label className="mb-2 block text-xs text-white/80">
                    Family medical history
                  </label>

                  <textarea
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="min-h-[75px] w-full resize-none rounded-xl border border-white/30 bg-black/20 p-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
                  />

                </div>

              </div>
            )}

            {step === 4 && (
              <div className="mx-auto max-w-[750px]">

                <SectionHeader
                  eyebrow="Step 04 / Profile Review"
                  title="Your profile is"
                  highlight="ready."
                  description="Review your information before entering AnatoMind."
                />

                <div className="grid gap-5 md:grid-cols-2">

                  <ReviewCard title="Personal information">

                    <ReviewRow
                      label="Name"
                      value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
                    />

                    <ReviewRow
                      label="Date of birth"
                      value={formData.dob || "Not provided"}
                    />

                    <ReviewRow
                      label="Age"
                      value={
                        calculateAge()
                          ? `${calculateAge()} years`
                          : "Not available"
                      }
                    />

                    <ReviewRow
                      label="Gender"
                      value={formData.gender || "Not provided"}
                    />

                    <ReviewRow
                      label="Blood group"
                      value={formData.bloodGroup || "Not provided"}
                    />

                  </ReviewCard>

                  <ReviewCard title="Contact information">

                    <ReviewRow
                      label="Phone"
                      value={formData.phone || "Not provided"}
                    />

                    <ReviewRow
                      label="Email"
                      value={formData.email || "Not provided"}
                    />

                    <ReviewRow
                      label="Emergency"
                      value={
                        formData.emergencyName
                          ? `${formData.emergencyName} • ${formData.emergencyPhone}`
                          : "Not provided"
                      }
                    />

                  </ReviewCard>

                </div>

                <div className="mt-5 rounded-2xl border border-red-400/30 bg-black/15 p-6 backdrop-blur-md">

                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-red-300">
                    Medical Overview
                  </p>

                  <div className="mt-5 grid gap-5 md:grid-cols-3">

                    <ReviewTagSection
                      title="Allergies"
                      tags={formData.allergies}
                    />

                    <ReviewTagSection
                      title="Medications"
                      tags={formData.medications}
                    />

                    <ReviewTagSection
                      title="Conditions"
                      tags={formData.conditions}
                    />

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="flex items-center justify-between border-t border-white/15 bg-black/10 px-6 py-4 lg:px-10">

            <button
              onClick={previousStep}
              disabled={step === 1}
              className={`rounded-full px-5 py-2.5 font-mono text-[8px] uppercase tracking-[0.18em] transition ${
                step === 1
                  ? "cursor-not-allowed text-white/20"
                  : "border border-white/20 bg-black/10 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              ← Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="group flex items-center gap-3 rounded-full bg-red-600 px-6 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_30px_rgba(220,38,38,0.4)] transition hover:-translate-y-0.5 hover:bg-red-500"
              >
                Continue

                <span className="text-base transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <button
                onClick={enterDashboard}
                className="group flex items-center gap-3 rounded-full bg-red-600 px-7 py-3 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_35px_rgba(220,38,38,0.45)] transition hover:-translate-y-0.5 hover:bg-red-500"
              >
                Enter AnatoMind

                <span className="text-base transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}) {
  return (
    <div className="mb-8">

      <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-300">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-semibold lg:text-4xl">
        {title}{" "}
        <span className="text-red-400">
          {highlight}
        </span>
      </h2>

      <p className="mt-2 text-sm text-white/65">
        {description}
      </p>

    </div>
  );
}


function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>

      <label className="mb-2 block text-xs text-white/80">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-white/30 bg-black/20 px-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
      />

    </div>
  );
}


function SimpleInput({
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-11 rounded-xl border border-white/30 bg-black/20 px-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
    />
  );
}


function TagInput({
  title,
  placeholder,
  value,
  onChange,
  name,
  onAdd,
  tags,
  onRemove,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div>

      <label className="mb-2 block text-xs text-white/80">
        {title}
      </label>

      <div className="flex gap-3">

        <input
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-11 flex-1 rounded-xl border border-white/30 bg-black/20 px-4 text-sm outline-none placeholder:text-white/35 focus:border-red-400"
        />

        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl border border-red-400/50 bg-red-500/15 px-5 text-xs text-red-300 transition hover:bg-red-500 hover:text-white"
        >
          Add
        </button>

      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onRemove(tag)}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-200 transition hover:bg-red-500/25"
            >
              {tag}

              <span className="ml-1 text-red-300">
                ×
              </span>
            </button>
          ))}

        </div>
      )}

    </div>
  );
}


function ReviewCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-black/15 p-5 backdrop-blur-md">

      <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.22em] text-red-300">
        {title}
      </p>

      <div className="space-y-3">
        {children}
      </div>

    </div>
  );
}


function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">

      <span className="text-xs text-white/45">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-xs text-white/85">
        {value}
      </span>

    </div>
  );
}


function ReviewTagSection({ title, tags }) {
  return (
    <div>

      <p className="text-[10px] text-white/50">
        {title}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">

        {tags.length > 0 ? (
          tags.map((item) => (
            <span
              key={item}
              className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[10px] text-red-200"
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-white/60">
            None reported
          </span>
        )}

      </div>

    </div>
  );
}