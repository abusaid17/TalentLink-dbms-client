
const UpdateUser = () => {


    const handleUpdateUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const name = form.name.value;
        const email = form.email.value;
        const age = form.age.value;
        const gender = form.gender.value;
        const userInfo = { id, name, email, age, gender };
        console.log(userInfo);
    }


    return (
        <div className="flex mx-auto mt-8 text-center justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleUpdateUser} className="fieldset">
                        <div className="card bg-base-300 text-3xl font-bold text-orange-600 rounded-box grid h-16 place-items-center mb-2">Update User Info</div>
                        <div>
                            <label className="fieldset-label">ID </label>
                            <input type="number" name="id"  className="input" placeholder="Id" />
                        </div>
                        <div>
                            <label className="fieldset-label">Name</label>
                            <input type="text" name="name" className="input" placeholder="Name" />
                        </div>
                        <div>
                            <label className="fieldset-label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" />
                        </div>
                        <div>
                            <label className="fieldset-label">Age</label>
                            <input type="number" name="age" className="input" placeholder="Age" />
                        </div>
                        <div>
                            <label className="fieldset-label">Gender</label>
                            <input type="text" name="gender" className="input" placeholder="male/female" />
                        </div>
                        <button className="btn btn-neutral mt-4">Update Info</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;