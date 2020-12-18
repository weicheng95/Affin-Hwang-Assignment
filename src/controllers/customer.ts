"use strict";

import { Response, Request } from "express";
import { check, validationResult } from "express-validator";
import * as admin from "firebase-admin";
import { Customer } from "../models/customer";
import logger from "../util/logger";

/**
 * get customer detail
 * @route GET /customer/<customerId>
 */
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    await check("customerId", "customer Id cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    // get customer ref by id
    const customerDoc = await getCustomerDBDocById(req.params.customerId);
    if (!customerDoc) {
      return res.status(400).send({
        message: "customer not found",
      });
    }
    return res.send((await customerDoc.get()).data());
  } catch (err) {
    res.status(500).send({
      message: "something wrong",
    });
  }
};

/**
 * get customer list
 * @route GET /customer/<customerId>
 */
export const getCustomerList = async (req: Request, res: Response) => {
  try {
    // get customer ref by id
    const customerRef = admin.firestore().collection("customer");
    const customerSnapshot = await customerRef.get();
    if (customerSnapshot.empty) {
      return res.status(400).send({
        message: "no customer found",
      });
    }
    return res.send(
      customerSnapshot.docs.map((snapshot) => {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      })
    );
  } catch (err) {
    res.status(500).send({
      message: "something wrong",
    });
  }
};

/**
 * Create new customer
 * @route POST /customer
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    await check("name", "Name cannot be blank").not().isEmpty().run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("age", "Age cannot be blank").not().isEmpty().run(req);
    await check("phoneNumber", "phone number cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    // check user
    const hasCustomer = await isCustomerExist(req.body.email);
    if (hasCustomer) {
      return res.status(400).send({
        message: "This customer already existed",
      });
    }

    const customerRef = admin.firestore().collection("customer");
    await customerRef.doc().set(<Customer>{
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      createdDate: new Date().toISOString(),
    });

    return res.status(201).send();
  } catch (err) {
    res.status(500).send({
      message: "something wrong",
    });
  }
};

/**
 * Update customer detail
 * @route PUT /customer/<customerId>
 */
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    await check("customerId", "customer Id cannot be blank").not().isEmpty().run(req);
    await check("name", "Name cannot be blank").not().isEmpty().run(req);
    await check("email", "Email is not valid").isEmail().run(req);
    await check("age", "Age cannot be blank").not().isEmpty().run(req);
    await check("phoneNumber", "phone number cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    // get customer ref by id
    const customerDoc = await getCustomerDBDocById(req.params.customerId);
    if (!customerDoc) {
      return res.status(400).send({
        message: "Customer not found",
      });
    }

    const customerSnapshot = await customerDoc.get();
    const customerData = customerSnapshot.data() as Customer;

    if (customerData.email !== req.body.email) {
      // check existing customer
      const hasCustomer = await isCustomerExist(req.body.email);
      if (hasCustomer) {
        return res.status(400).send({
          message: "This email already existed",
        });
      }
    }

    const newCustomerData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      phoneNumber: req.body.phoneNumber,
      updatedDate: new Date().toISOString(),
    };

    customerDoc.update(newCustomerData);

    return res.send({ id: customerSnapshot.id, ...newCustomerData });
  } catch (err) {
    res.status(500).send({
      message: "something wrong",
    });
  }
};

/**
 * delete customer
 * @route DELETE /customer/<customerId>
 */
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await check("customerId", "customer Id cannot be blank").not().isEmpty().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    // get customer ref by id
    const customerDoc = await getCustomerDBDocById(req.params.customerId);
    if (!customerDoc) {
      return res.status(400).send({
        message: "customer not found",
      });
    }
    await customerDoc.delete();
    return res.send({
      messege: "customer is deleted",
    });
  } catch (err) {
    res.status(500).send({
      message: "something wrong",
    });
  }
};

const isCustomerExist = async (email: string): Promise<boolean> => {
  try {
    if (!email) {
      return;
    }
    const customerRef = admin.firestore().collection("customer");
    const customerSnapshot = await customerRef.where("email", "==", email).get();
    return customerSnapshot.empty ? false : true;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const getCustomerDBDocById = async (customerId: string): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>> => {
  try {
    if (!customerId) {
      return;
    }
    const customerRef = admin.firestore().collection("customer").doc(customerId);
    const customerDoc = await customerRef.get();
    return customerDoc.exists ? customerRef : null;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
