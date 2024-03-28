import Index from "./routes";

const App = () => {
  // useEffect(() => {
  //   dispatch(fetchPost());
  // }, [dispatch]);

  return (
    // <div className="text-center  ">
    //   <Navbar />

    //   {/* <div className="mt-10">
    //     {isLoading && <>Loading....</>}
    //     {error && <>{error}</>}
    //     {post.map((data, index) => (
    //       <div key={data?.id}>
    //         <li>{index + 1}</li>
    //       </div>
    //     ))}
    //   </div> */}
    //   <div className="mt-10">
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<Home />}></Route>
    //         <Route path="/add-todo" element={<AddTask />}></Route>
    //         <Route path="/all-todo" element={<AllTodo />}></Route>
    //         <Route path="/edit-todo" element={<EditTask />}></Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </div>
    // </div>
    <Index />
  );
};

export default App;
