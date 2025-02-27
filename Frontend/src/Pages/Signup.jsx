const Signup = () => {
  return (
    <div>
      <form>
        <input type="text" id="name" placeholder="Name" required /> <br />
        <input type="tel" id="phNo" placeholder="Phone Number" /> <br />
        <input type="mail" id="email" placeholder="Email id" required /> <br />
        <input type="text" id="password" placeholder="Password" required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Signup;
