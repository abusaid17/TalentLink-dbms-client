import image from '../../assets/image/IMG_1940.JPG'
const About = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={image}
                        className="max-w-sm rounded-lg shadow-2xl h-[500px]"
                    />
                    <div className='pr-5'>
                        <h1 className="text-5xl font-bold bg-success py-5 px-4 rounded-xl">About Us</h1>
                        <p className="py-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ratione, quis animi consectetur odio quod recusandae consequatur quam iure, nihil quasi cupiditate explicabo deleniti. Reiciendis praesentium libero atque. Veritatis, delectus?
                            Alias eligendi fuga veniam mollitia! Quisquam magni autem ad molestias, dolores quae consequatur nulla distinctio iusto quasi corporis pariatur ratione eius eligendi cumque dicta nostrum sapiente id nisi. Saepe, provident.
                            Corporis ipsam voluptatum ratione nulla odit vero pariatur autem doloremque repellendus asperiores! Error, id architecto nesciunt dolores eius, non rerum fuga nulla ab voluptate, cum accusamus nihil inventore possimus odio?
                            Quidem, quaerat? Possimus nemo placeat quae ut hic aperiam, odit deserunt dolorem, dolor aspernatur suscipit. Vel iure iusto minima quod? Aut exercitationem voluptatum perspiciatis neque cumque numquam tempore asperiores nostrum!
                            Facilis ratione eveniet perferendis, ad optio porro ipsam repellendus id atque iste quas nulla tempora nemo illum eos labore incidunt obcaecati. Voluptate numquam dolor eaque voluptatibus similique laudantium eum facilis!
                            Ut iure possimus reiciendis? Cupiditate esse quod dolor praesentium voluptatem ducimus at vero error sint consequatur ullam sed, ipsa molestiae voluptates ipsum aliquid reprehenderit similique dicta. Perferendis dignissimos repellat nostrum.
                            Provident, architecto iste? Aperiam, dolores itaque sed error nesciunt quisquam earum at iure! Eveniet molestiae, voluptates ratione tenetur aperiam voluptate saepe cupiditate, adipisci doloribus sunt, enim sed explicabo ipsa porro.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;