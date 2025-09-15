import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_API_URL } from "../../lib/constatns/api.constant";
import { useNavigate } from "react-router-dom";
import mainImg from "../../assets/login.svg";
import logo from "../../assets/images/logoDark.svg";
import { loginSchema, type loginFormType } from "./../../lib/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const naivate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const { register, handleSubmit } = form;
  const login = (values: loginFormType) => {
    axios
      .post(`${BASE_API_URL}/Auth/Login`, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        localStorage.setItem("token", data.data);
        naivate("/");
      })
      .catch(() => {
      });
  };
  return (
    <section className="h-dvh grid grid-cols-1 lg:grid-cols-2 relative">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(login)} className="space-y-3 w-7/12 mx-auto h-screen flex flex-col justify-center">
          <div className="flex flex-col items-center gap-5">
            <img src={logo} alt="Innova Logo" />
            <h1 className="text-primary text-3xl sm:text-[40px] font-semibold">Welcome to Innova!</h1>
          </div>
          <div className="">
            <label htmlFor={"email"} className="text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id={"email"}
              type={"email"}
              placeholder="Enter your email..."
              {...register("email")}
              className={`w-full px-3 py-2 border rounded-lg outline-none 
                        focus:ring-2 focus:ring-primary focus:border-primary 
                        ${form.formState?.errors?.email?.message ? "border-red-500" : "border-gray-300"}`}
            />
            {form.formState?.errors?.email?.message && (
              <p className="text-xs text-red-500">{form.formState?.errors?.email?.message}</p>
            )}
          </div>
          <div className="">
            <label htmlFor={"password"} className="text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id={"password"}
              type={"password"}
              placeholder="Enter your password..."
              {...register("password")}
              className={`w-full px-3 py-2 border rounded-lg outline-none 
                        focus:ring-2 focus:ring-primary focus:border-primary 
                        ${form.formState?.errors?.password?.message ? "border-red-500" : "border-gray-300"}`}
            />
            {form.formState?.errors?.password?.message && (
              <p className="text-xs text-red-500">{form.formState?.errors?.password?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-secondary border border-[#A7E900] text-primary font-semibold px-4 py-2 md:px-6 md:py-4 rounded-[28px] text-sm transition-all hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-primary overflow-hidden max-lg:hidden">
        <div>
          <img src={mainImg} alt="Login Image" className="w-full" />
        </div>
      </div>
    </section>
  );
};

export default Login;
