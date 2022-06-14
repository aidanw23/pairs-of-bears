import React, { useState, useEffect } from 'react';

export function ShowButton (props) {

    function showHide () {
        props.onChange()
    }

    return (
        <div class = 'showHideButton' onClick = {showHide}>
            <p>{'<<'}</p>
        </div>
    )
}

export function HideButton (props) {

    function showHide () {
        props.onChange()
    }

    return (
        <div class = 'showHideButton' onClick = {showHide}>
            <p>{'>>'}</p>
        </div>
    )
}