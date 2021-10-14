import React from 'react';
import {intl} from '../../../routes/AppRoot';

const style = {
  border: '1px solid black',
  textAlign: 'center',
};

export default class extends React.Component {
  render() {
    return (
      <table style={{borderCollapse: 'collapse', width: '100%', paddingTop: '10rem'}}>
        <caption>
          {intl('profile.teacher.studentPrint.resultStudent')} {this.props.lookUpStudent && (this.props.lookUpStudent.first_name + ' ' + this.props.lookUpStudent.last_name)}.
        </caption>
        {this.props.lookUpResults.map((lookUpResult) => {
          return (
            <tbody style={{paddingTop: '7px'}} key={lookUpResult.id}>
              <tr style={{...style, backgroundColor: '#bdc3c7'}} key={lookUpResult.id+'info'}>
                <th style={{...style, backgroundColor: '#bdc3c7'}}>{intl('profile.teacher.studentPrint.game')}</th>
                <td style={{...style, backgroundColor: '#bdc3c7'}}>{lookUpResult.game_name}</td>
                <th style={{...style, backgroundColor: '#bdc3c7'}}>{intl('profile.teacher.studentPrint.date')}</th>
                <td style={{...style, backgroundColor: '#bdc3c7'}}>{lookUpResult.submit_at}</td>
                <th style={{...style, backgroundColor: '#bdc3c7'}}>{intl('profile.teacher.studentPrint.right')}</th>
                <td style={{...style, backgroundColor: '#bdc3c7'}}>{lookUpResult.right_answers}</td>
                <th style={{...style, backgroundColor: '#bdc3c7'}}>{intl('profile.teacher.studentPrint.all')}</th>
                <td style={{...style, backgroundColor: '#bdc3c7'}}>{lookUpResult.total_tasks}</td>
                <th style={{...style, backgroundColor: '#bdc3c7'}}>{intl('profile.teacher.studentPrint.overallScore')}</th>
                <td style={{...style, backgroundColor: '#bdc3c7'}}>{lookUpResult.total_points}</td>
              </tr>
              <tr key={lookUpResult.id+'header'}>
                <th style={style}>{intl('profile.teacher.studentPrint.numberOfActions')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.numberOfNumberP')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.numberOfNumberM')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.speed')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.replied')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.correctAnswer')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.usedNumberP')}</th>
                <th style={style}>{intl('profile.teacher.studentPrint.usedNumberM')}</th>
                <th/>
              </tr>
              {lookUpResult.payload.map((item) => (
                <tr key={item.id}>
                  <td style={style}>{item.action_count}</td>
                  <td style={style}>{item.count_digits}</td>
                  <td style={style}>{item.count_digit_minus}</td>
                  <td style={style}>{item.speed}</td>
                  <td style={style}>{item.answer || intl('empty')}</td>
                  <td style={style}>{item.exact}</td>
                  <td style={style}>{item.modules}</td>
                  <td style={style}>{item.modules_minus}</td>
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    );
  }
}

