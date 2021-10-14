import React from 'react';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {NavigateBefore, NavigateNext} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import {intl} from '../../../routes/AppRoot';


const commonListItemStyle = (theme) => ({
  marginRight: theme.spacing(3),
  marginLeft: theme.spacing(3),
  cursor: 'pointer',
  fontWeight: '500',
  display: 'inline-block',
  transition: 'font-size 0.3s cubic-bezier(0.61, -0.19, 0.7, -0.11)',
});

const useStyles = makeStyles((theme) => ({
  datesScrollBardContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
  },
  root: {
    'overflowX': 'scroll',
    'whiteSpace': 'nowrap',
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
    'scrollbar-height': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    'textAlign': 'center',
  },

  listElement: {
    ...commonListItemStyle(theme),
    'color': theme.palette.grey['700'],
    '&:hover': {
      textShadow: '0px 0.5px 1px rgba(0,0,0,0.3)',
    },
  },
  selectedDateRange: {
    ...commonListItemStyle(theme),
    fontSize: '1.3rem',
    color: theme.palette.info.dark,
    textShadow: '0px 0.5px 2px rgba(0,0,0,0.3)',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
}));


export default function({dateRanges, selectedDateRange, setDateRange}) {
  const dateRangesContainerRef = React.createRef();
  const classes = useStyles();

  const scrollRight = () => {
    dateRangesContainerRef.current.scroll({
      top: 0,
      left: dateRangesContainerRef.current.scrollLeft += 100,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    dateRangesContainerRef.current.scroll({
      top: 0,
      left: dateRangesContainerRef.current.scrollLeft -= 100,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    if (dateRangesContainerRef.current) {
      dateRangesContainerRef.current.scrollLeft = dateRangesContainerRef.current.offsetWidth;
    }
  }, [dateRangesContainerRef]);

  return (
    <Card variant="outlined" className={classes.datesScrollBardContainer}>
      <IconButton
        color="primary"
        onClick={scrollLeft}
      >
        <NavigateBefore/>
      </IconButton>
      <div className={classes.root} ref={dateRangesContainerRef}>
        {dateRanges.map((range) => (
          <span key={range.display}
            className={selectedDateRange.startDate === range.startDate ? classes.selectedDateRange : classes.listElement}
            onClick={() => setDateRange(range.startDate, range.endDate)}
          >{range.display}</span>
        ))}
        {dateRanges.length === 0 && <span>{intl('profile.studentProfile.studentResultDateRanges.span')}</span>}
      </div>
      <IconButton
        color="primary"
        onClick={scrollRight}
      >
        <NavigateNext/>
      </IconButton>
    </Card>
  );
}
