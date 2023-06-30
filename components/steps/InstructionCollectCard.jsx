import { Typography, Grid, TextField, Button } from "@mui/material";
import React, {useState} from "react";

export default function InstructionCollectCard({
  stepNum,
  driveCode,
  driveStatus
}) {
  let cardContent = <></>;


  switch(stepNum) {
    case 2: // check what number this should be
      cardContent = <CollectBooksCard
        driveCode = {driveCode}
        info = {driveStatus.collectingBooks}>
        </CollectBooksCard>;
      
      break; 
    case 3:
      cardContent = <CollectIntFeeCard
        driveCode = {driveCode}
        info = {driveStatus.prepareToShip}>
        </CollectIntFeeCard>;
      break; 
    case 4:
      cardContent = <CollectDomFeeCard
        driveCode = {driveCode}
        info = {driveStatus.prepareToShip}>
      </CollectDomFeeCard>;
      break;
    case 6:
      cardContent = <CollectDate
      driveCode = {driveCode}
      info = {driveStatus.finishLine}>
    </CollectDate>;
      break;
    case 7:
      cardContent = <CollectNumBooks
        driveCode = {driveCode}
        info = {driveStatus.finishLine}>
      </CollectNumBooks>;
      break;
    case 8:
      cardContent = <CollectNumBoxes
        driveCode = {driveCode}
        info = {driveStatus.finishLine}>
      </CollectNumBoxes>;
      break;
    break; 
    default:
      // return error ?
  }
      
  return (
    <Grid
      sx={{
        border: "3px solid black;",
        borderRadius: "5px"
      }}
      container
      direction="row"
      spacing={3}
      minWidth={"50%"}
      backgroundColor="#F5F5F5"
    >
      {cardContent}      
    </Grid>
  );
}

function CollectBooksCard(props) {
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [bookState, setBookState] = useState("");
  const [currBooks, setCurrBooks] = useState(props.info.booksCurrent);
  console.log(currBooks);

  const handleInput = e => {
    setBookState(e.target.value);
    console.log(bookState);
    console.log(typeof(bookState))
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
    if(parseInt(bookState) > 0 && parseInt(bookState) < 500) {
      try {

        const data = {
          cb: {
            booksCurrent: parseInt(currBooks) + parseInt(bookState),
            updateFreq: props.info.updateFreq++,
            lastUpdate: "6/20/23"  // implement datetime
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
      setCurrBooks(parseInt(currBooks)+parseInt(bookState));
      setBookState("");
    }
    else {
      console.log("not valid")
      setBookState("");
    }
    
  }
  return (
    <Grid container alignItems="center" sx={{ p: 5 }}>
      <Grid item xs={12} sx ={{ pb: 4 }}>
        <Typography variant="h4">
          <span>Current Number of Books Collected:</span> <span>{currBooks}</span>
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ pb: 2 }}>
        <Typography variant="h5">Update Books Collected:</Typography>
      </Grid>
      <Grid item xs={8} sx={{ pb: 2 }}>
        <TextField size="small" fullWidth id="books-collected" variant="outlined" value={bookState} onChange={handleInput}/>
      </Grid>

      <Grid item xs={11}>
      </Grid>
      <Grid item xs={1} sx={{pb:4}}>
        <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
      </Grid>
    </Grid>

  );
}

function CollectIntFeeCard(props) {
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [fundState, setFundState] = useState("");
  const [currFunds, setCurrFunds] = useState(props.info.intFee);
  console.log(currFunds);
  const handleInput = e => {
    setFundState(e.target.value);
    console.log(fundState);
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
    if (parseInt(fundState) > 0 && parseInt(fundState) < 500) {
      try {

        const data = {
          pts: {
            intFee: parseInt(currFunds) + parseInt(fundState),
            domFee: props.info.domFee,
            materials: props.info.materials
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
      setCurrFunds(parseInt(currFunds) + parseInt(fundState));
      setFundState("");
    }
    else {
      console.log("not valid")
      setFundState("");
    }
    
    
  }
  return (
    <Grid container alignItems="center" sx={{ p: 5 }}>
      <Grid item xs={12} sx ={{ pb: 4 }}>
        <Typography variant="h4">
          <span>International Shipping Fees Collected:</span> <span>$ {currFunds}</span>
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ pb: 2 }}>
        <Typography variant="h5">Update Funds Collected:</Typography>
      </Grid>
      <Grid item xs={8} sx={{ pb: 2 }}>
        <TextField size="small" fullWidth id="books-collected" variant="outlined" value={fundState} onChange={handleInput}/>
      </Grid>

      <Grid item xs={11}>
      </Grid>
      <Grid item xs={1} sx={{pb:4}}>
        <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
      </Grid>
    </Grid>

  );
}

function CollectDomFeeCard(props) {
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [fundState, setFundState] = useState("");
  const [currFunds, setCurrFunds] = useState(props.info.intFee);

  const handleInput = e => {
    setFundState(e.target.value);
    console.log(fundState);
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
    if (parseInt(fundState) > 0 && parseInt(fundState) < 500) {
      try {
        const data = {
          pts: {
            intFee: props.info.intFee,
            domFee: parseInt(currFunds) + parseInt(fundState),
            materials: props.info.materials
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
      setCurrFunds(parseInt(currFunds) + parseInt(fundState));
      setFundState("");
    }
    else {
      console.log("not valid")
      setFundState("");
    }
    
  }
  return (
    <Grid container alignItems="center" sx={{ p: 5 }}>
      <Grid item xs={12} sx={{ pb: 4 }}>
        <Typography variant="h4">
          <span>Domestic Shipping Fees Collected:</span> <span>$ {currFunds}</span>
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ pb: 2 }}>
        <Typography variant="h5">Update Books Collected:</Typography>
      </Grid>
      <Grid item xs={8} sx={{ pb: 2 }}>
        <TextField size="small" fullWidth id="books-collected" variant="outlined" value={fundState} onChange={handleInput}/>
      </Grid>

      <Grid item xs={11}>
      </Grid>
      <Grid item xs={1} sx={{pb:4}}>
        <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
      </Grid>
    </Grid>

  );
}

function CollectNumBooks(props){
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [books, setBooks] = useState(props.info.numBooks);

  const handleInput = e => {
    setBooks(e.target.value);
    console.log(books);
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
      try {
        const data = {
          fl: {
            dateSent: props.info.dateSent,
            numBoxes: props.info.numBoxes,
            numBooks: books
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
    }
    return (
      <Grid container alignItems="center" sx={{ p: 5 }}>
        <Grid item xs={12} sx={{ pb: 4 }}>
          <Typography variant="h4">
            <span>Number of Books Collected:</span> <span>{books}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ pb: 2 }}>
          <Typography variant="h5">Update Books Collected:</Typography>
        </Grid>
        <Grid item xs={8} sx={{ pb: 2 }}>
          <TextField size="small" fullWidth id="books-collected" variant="outlined" value={books} onChange={handleInput}/>
        </Grid>

        <Grid item xs={11}>
        </Grid>
        <Grid item xs={1} sx={{pb:4}}>
          <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
        </Grid>
      </Grid>
    )
}

function CollectNumBoxes(props){
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [boxes, setBoxes] = useState(props.info.numBoxes);

  const handleInput = e => {
    setBoxes(e.target.value);
    console.log(boxes);
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
      try {
        const data = {
          fl: {
            dateSent: props.info.dateSent,
            numBoxes: boxes,
            numBooks: props.info.numBooks
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
    }
    return (
      <Grid container alignItems="center" sx={{ p: 5 }}>
        <Grid item xs={12} sx={{ pb: 4 }}>
          <Typography variant="h4">
            <span>Number of Boxes Collected:</span> <span>{boxes}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ pb: 2 }}>
          <Typography variant="h5">Update Boxes Collected:</Typography>
        </Grid>
        <Grid item xs={8} sx={{ pb: 2 }}>
          <TextField size="small" fullWidth id="boxes-collected" variant="outlined" value={boxes} onChange={handleInput}/>
        </Grid>

        <Grid item xs={11}>
        </Grid>
        <Grid item xs={1} sx={{pb:4}}>
          <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
        </Grid>
      </Grid>
    )
}

function CollectDate(props){
  const styles = {
    btn: {
      backgroundColor: "#FE9834",
      width: "5vw"
    },
  }
  const [date, setDate] = useState(props.info.dateSent);

  const handleInput = e => {
    setDate(e.target.value);
    console.log(date);
  }

  const handleSubmitButton = async () => {
    console.log("submit clicked");
      try {
        const data = {
          fl: {
            dateSent: date,
            numBoxes: props.info.numBoxes,
            numBooks: props.info.numBooks
          }
        }
        await fetch(`/api/bookDrive/${props.driveCode}`,{
          method: "PUT",
          body: JSON.stringify(data), // textfield information
        });
        console.log("submitted to DB");
      } catch (e) {
        console.error(e);
      }
    }
    return (
      <Grid container alignItems="center" sx={{ p: 5 }}>
        <Grid item xs={12} sx={{ pb: 4 }}>
          <Typography variant="h4">
            <span>Date Sent:</span> <span>{date}</span>
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ pb: 2 }}>
          <Typography variant="h5">Update Date Sent:</Typography>
        </Grid>
        <Grid item xs={8} sx={{ pb: 2 }}>
          <TextField size="small" fullWidth id="date-sent" variant="outlined" value={date} onChange={handleInput}/>
        </Grid>

        <Grid item xs={11}>
        </Grid>
        <Grid item xs={1} sx={{pb:4}}>
          <Button style={styles.btn} variant="contained" size="large" onClick={handleSubmitButton}>Submit</Button>
        </Grid>
      </Grid>
    )
}
