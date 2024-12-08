type PokemonData = {
    id: number;
    name: string;
    iconImage: string;
    image: string;
    type: string;
    jpName: string;
    jpType: string;
};

const PokenmonThumbnails = ({id, name, image, iconImage, type, jpName, jpType}: PokemonData) => {

    const styleForType = `thumb-container ${type}`


    return (
        <div className={styleForType}>
            <div className="number">
                <small>#0{id}</small>
            </div>
            <img src={image} alt={name} />
            <img src={iconImage} alt={name} className="icon-image" />
            <div className="detail-wrapper">
                <h4>{jpName}</h4>
                <h3>{jpType}</h3>
            </div>
        </div>
    );
};

export default PokenmonThumbnails;