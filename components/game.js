import Image from "next/image"

export default function Game({team1, imageSrc, imageSrc2, league, leagueImage, team2, matchDate, score1, score2, referee, elapsed}){

    const classPoint = `match-score-number match-score-number${score1 < score2 ? '' : '--leading'}`
    const classPoint2 = `match-score-number match-score-number${score2 < score1 ? '' : '--leading'}`

    console.log(classPoint)
    console.log(classPoint2)

    return (
        <div className="container">
            <div className="match">
                <div className="match-header">
                    <div className="match-status">Live</div>
                    <div className="match-tournament"><Image src={leagueImage} alt="Picture of team logo" width={30} height={30}/>{league}</div>
                    <div className="match-action">
                        <button className="btn-icon">
                        <i className="fa-solid fa-money-check-dollar"></i>
                        </button>
                    </div>
                </div>
                <div className="match-content">
                    <div className="column">
                        <div className="team team--home">
                            <div className="team-logo">
                                <Image src={imageSrc} alt="Picture of team logo" width={100} height={100}/>
                            </div>
                            <h2 className="team-name">{team1}</h2>
                        </div>
                    </div>

                    


                    <div className="column">
                        <div className="match-details">
                            <div className="match-date">
                                {matchDate}
                            </div>
                            <div className="match-score">
                                
                                
                                <span className={classPoint}>{score1}</span>

                                <span className="match-score-divider">:</span>

                                
                                <span className={classPoint2}>{score2}</span>
                            </div>

                            <div className="match-time-lapsed">
                                {elapsed}'
                            </div>
                            {referee && <div className="match-referee">
                                Referee: <strong>{referee}</strong>
                            </div>}
                            
                            {/* <div className="match-bet-options">
                                <button className="match-bet-option">1.48</button>
                                <button className="match-bet-option">7.84</button>
                                <button className="match-bet-option">3.24</button>
                            </div> */}
                            <button className="match-bet-place" 
                            onClick={() => {
                                location.href = "/w-transact";

                            }}>Place a BET</button>
                        </div>
                    </div>

                    <div className="column">
                        <div className="team team--home">
                            <div className="team-logo">
                                <Image src={imageSrc2} alt="Picture of team logo" width={100} height={100}/>
                            </div>
                            <h2 className="team-name">{team2}</h2>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}