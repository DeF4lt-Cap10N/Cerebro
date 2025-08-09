import { Button } from "./components/Button";
import { ShareIcon } from "./icons/ShareIcon";
const App = () => {
  return (
    <div >
      <Button
        variant="secondary"
        text="Submit"
        onClick={() => console.log("Clicked")}
        loading={false}
        startIcon={<ShareIcon/>}
      />
      <Button variant="primary" text="Click Me" />
    </div>
  );
};

export default App;
