import {
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../api/auth";
import { useFormik } from "formik";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { FiUnlock, FiUser } from "react-icons/fi";
import ForgotModal from "../ResetPassword/ForgotModal";
import LoadingBar from "../Utility/LoadingBar";
import { loginSchema } from "../../helpers/FormikSchema";

const container = {
  direction: "column",
  gap: "8px",
  alignItems: "center",
};

const textAttr = {
  fontSize: "12px",
};

const clickAttr = {
  color: "primary",
  textDecor: "underline",
  cursor: "pointer",
  _hover: {
    color: "errorPrimary",
  },
};

function FormLogin() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const initialValues = {
    identifier: "",
    password: "",
  };

  async function handleSubmit(attributes) {
    setIsLoading(true);
    await login(toast, attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const identifierAttr = setAttr(
    "identifier",
    "text",
    "Username or Email",
    <FiUser />,
    formik,
    "light"
  );
  const passwordAttr = setAttr(
    "password",
    "password",
    "Password",
    <FiUnlock />,
    formik,
    "light"
  );
  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    w: "full",
    isLoading,
  };
  const modalAttr = { isOpen, onClose };

  const infoAttr = {
    color: "red",
    fontSize: "13px",
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Text {...infoAttr}>Login Role</Text>
        <Text {...infoAttr}>
          User: username = user / password = Password12!
        </Text>
        <Text {...infoAttr}>
          Admin: username = admin / password = Password12!
        </Text>
        <Text {...infoAttr} mb={3}>
          Admin Warehouse: username = admin_warehouse / password = Password12!
        </Text>
        <Flex {...container}>
          <InputTextCustom {...identifierAttr} />
          <InputTextCustom {...passwordAttr} />
          <HStack {...textAttr}>
            <Text>Forgot Password?</Text>
            <Text {...clickAttr} onClick={onOpen}>
              Here
            </Text>
          </HStack>
          <Button {...buttonAttr}>Login</Button>
        </Flex>
      </form>
      <ForgotModal {...modalAttr} />
      {isLoading && <LoadingBar />}
    </>
  );
}

export default FormLogin;
