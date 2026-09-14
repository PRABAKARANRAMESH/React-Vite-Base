import LoginComponent from "@/components/auth/login/LoginComponent";
import PageContainer from "@/components/page-container/PageContainer";

const LoginPage = () => {
  return (
    <PageContainer title="Login" description="Login to your account">
      <LoginComponent />
    </PageContainer>
  );
};

export default LoginPage;
