import Web from '../../assets/image/full-stack-web-development-specialization-v2.png.webp'
import design from '../../assets/image/digital-marketing-specialization-v2.png.webp'
import seo from '../../assets/image/machine-learning.png.webp'
import marcketing from '../../assets/image/python.png.webp'
import software from '../../assets/image/web-development.png.webp'
import video from '../../assets/image/web-development.png.webp'

const PopularServices = () => {
    return (
        <>
            <div className="flex max-w-96 text-center mx-auto flex-col mt-8">
                <div className="card bg-base-300 rounded-box grid h-16 text-3xl font-bold  place-items-center">Our Premium Course</div>
                <div className="divider"></div>
            </div>
            <div>
                {/* First Div */}
                <div className="flex gap-8 flex-col lg:flex-row mx-auto mt-8 justify-center items-center">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={Web} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Web Development
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={design} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Web Design
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={seo} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                SEO
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second div */}
                <div className="flex gap-8 flex-col lg:flex-row mx-auto mt-8 justify-center items-center">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={marcketing} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Social Media Marcketing
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={software} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Software Development
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={video} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Video Egitiong
                            </h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-info">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default PopularServices;