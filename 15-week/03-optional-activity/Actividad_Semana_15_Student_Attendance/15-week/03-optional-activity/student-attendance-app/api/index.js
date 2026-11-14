
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

const app = express();

const PORT = Number(process.env.PORT || 3000);

const JWT_SECRET = process.env.JWT_SECRET;
const DEMO_EMAIL = process.env.DEMO_EMAIL;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD;

if (
  !JWT_SECRET ||
  Buffer.byteLength(JWT_SECRET, "utf8") < 32 ||
  !DEMO_EMAIL ||
  !DEMO_PASSWORD
) {
  console.error(
    "Missing configuration: JWT_SECRET (32+ bytes), " +
    "DEMO_EMAIL and DEMO_PASSWORD are required."
  );
  process.exit(1);
}

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "capacitor://localhost",
      "http://localhost",
    ],
  })
);

app.use(express.json());

// Demonstration data only.
// These are fictional students, not real institutional records.

const students = [
  {
    id: 1,
    name: "Ana Martinez",
    email: "ana@example.test",
    program: "Systems Engineering",
  },
  {
    id: 2,
    name: "Carlos Ramirez",
    email: "carlos@example.test",
    program: "Systems Engineering",
  },
  {
    id: 3,
    name: "Laura Gomez",
    email: "laura@example.test",
    program: "Software Development",
  },
];

const attendance = [
  {
    id: 1,
    studentId: 1,
    date: "2026-11-05",
    status: "Present",
  },
  {
    id: 2,
    studentId: 2,
    date: "2026-11-05",
    status: "Absent",
  },
  {
    id: 3,
    studentId: 3,
    date: "2026-11-05",
    status: "Present",
  },
];

function secureCompare(a, b) {
  const first = crypto.createHash("sha256").update(a).digest();
  const second = crypto.createHash("sha256").update(b).digest();

  return crypto.timingSafeEqual(first, second);
}

// Health endpoint

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Student Attendance API",
    status: "online",
  });
});

// Login endpoint

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const validEmail = secureCompare(
    email.trim().toLowerCase(),
    DEMO_EMAIL.trim().toLowerCase()
  );

  const validPassword = secureCompare(
    password,
    DEMO_PASSWORD
  );

  if (!validEmail || !validPassword) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      email: DEMO_EMAIL,
      role: "TEACHER",
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
      subject: "demo-teacher",
    }
  );

  return res.json({
    token,
    tokenType: "Bearer",
    expiresIn: 3600,
    user: {
      email: DEMO_EMAIL,
      role: "TEACHER",
    },
  });
});

// JWT authentication middleware

function requireAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (
    !authorization ||
    !authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      error: "Authentication required",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      error: "Token is missing",
    });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });

    next();
  } catch {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}

// Protected students endpoint

app.get("/api/students", requireAuth, (req, res) => {
  res.json(students);
});

// Protected student detail endpoint

app.get("/api/students/:id", requireAuth, (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (item) => item.id === id
  );

  if (!student) {
    return res.status(404).json({
      error: "Student not found",
    });
  }

  res.json(student);
});

// Protected attendance endpoint

app.get("/api/attendance", requireAuth, (req, res) => {
  res.json(attendance);
});

// Protected attendance by student

app.get(
  "/api/attendance/student/:studentId",
  requireAuth,
  (req, res) => {
    const studentId = Number(req.params.studentId);

    const records = attendance.filter(
      (item) => item.studentId === studentId
    );

    res.json(records);
  }
);

// Not found

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
  });
});

// Start server only when executed directly.
// This allows automated tests to import the app later.

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `Student Attendance API running at http://localhost:${PORT}`
    );
  });
}

module.exports = app;
