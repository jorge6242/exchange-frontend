const MainLayout = (props: any) => (
  <div
    style={{ display: "flex", justifyContent: "center", alignSelf: "center", padding: 100, backgroundColor: "#F4F0EC" }}
  >
    {props.children}
  </div>
);
export default MainLayout;
