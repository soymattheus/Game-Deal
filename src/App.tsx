import Dashboard from "./screens/Dashboard";
import Providers from "./screens/Providers";

export default function App() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Dashboard/>
      </div>
    </Providers>
  );
}
