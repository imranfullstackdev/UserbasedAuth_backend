const e = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../Auth/auth.js");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
// addEmployeeTable

// For getting indivial user information

router.get("/user", auth, async (req, res) => {
  console.log(res.id);
  const User = await pool.query(`select * from addEmployeeTable where id=$1`, [
    res.id,
  ]);
  res.send({ user: User.rows });
  console.log("user", User.rows);
});

// login for hirerecchy
router.post("/login", async (req, res) => {
  console.log("bb", req.body);
  const loginUser = await pool.query(
    `select * from addEmployeeTable where mobilenumber=$1`,
    [req.body.mobilenumber]
  );
  console.log("login User", loginUser.rows);
  if (loginUser.rows.length > 0) {
    const token = jwt.sign(
      { id: loginUser.rows[0].id },
      process.env.SECRETKEY,
      {
        expiresIn: "1h",
      }
    );
    res.send({
      token: token,
      user: loginUser.rows,
      role: loginUser.rows[0].roles,
    });
    console.log(loginUser.rows[0].roles);
  } else {
    res.status(400).send({ err: "Invalid Creadential" });
  }
});
// GETTING ALL USER
router.get("/get", auth, async (req, res) => {
  console.log(req.body);
  const allUser = await pool.query(`select * from addEmployeeTable`);
  res.send(allUser.rows);
  console.log("getRequest", allUser.rows);
});

// posting the  data
router.post("/addEmployee", async (req, res) => {
  // for roles
  let role = 1;
  // if already user exist
  try {
    const alreadyuser = await pool.query(
      `select * from addEmployeeTable where mobilenumber=$1`,
      [req.body.mobilenumber]
    );
    console.log("alreadyUser", alreadyuser.rows.length);
    if (alreadyuser.rows.length == 0) {
      console.log("body", req.body);

      const addUser = await pool.query(
        `insert into addEmployeeTable(
      employeeid,
      employeeName,
 mobilenumber,
Amobilenumber,
emailadddress,
 adharcard,
 bankname,
 bankbranch,
 ifsc,
 uan,
 pincode,
 pan,
 address1,
 address2,
 district,
 state,
 roles
 
 ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) returning *`,
        [
          req.body.employeeid,
          req.body.employeeName,
          req.body.mobilenumber,
          req.body.Amobilenumber,
          req.body.emailadddress,
          req.body.adharcard,
          req.body.bankname,
          req.body.bankbranch,
          req.body.ifsc,
          req.body.uan,
          req.body.pan,
          req.body.pincode,
          req.body.address1,
          req.body.address2,
          req.body.district,
          req.body.state,
          role,
        ]
      );
      res.send(addUser.rows);
      console.log("post", addUser.rows);
    } else {
      res.status(400).send({ err: "User Already Exist" });
    }
  } catch (error) {
    console.log(error);
  }
});

//
// Update from
router.put("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  // `update crudtable2 set name=$1,email=$2,password=$3,Cpassword=$4,phonenumber=$5,qualification=$6,work=$7, where id=$8 `,
  const updateData = await pool.query(
    `update addEmployeeTable set
      employeeid=$1,
    employeeName=$2,
    mobilenumber=$3,
    Amobilenumber=$4,
   emailadddress=$5,
    adharcard=$6,
    bankname=$7,
    bankbranch=$8,
    ifsc=$9,
    uan=$10
    where 
    id=$11`,
    [
      req.body.employeeid,
      req.body.employeeName,
      req.body.mobilenumber,
      req.body.Amobilenumber,
      req.body.emailadddress,
      req.body.adharcard,
      req.body.bankname,
      req.body.bankbranch,
      req.body.ifsc,
      req.body.uan,
      id,
    ]
  );
  res.send({ edit: "Edited Sucessfully" });
});
// delete user
router.delete("/dlt/:id", async (req, res) => {
  const { id } = req.params;
  const dltUser = await pool.query(
    `delete from addEmployeeTable where id=$1 `,
    [id]
  );
  res.send({ dlt: "deleted sucessfully" });
});

module.exports = router;
