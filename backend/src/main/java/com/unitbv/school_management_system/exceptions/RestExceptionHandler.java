package com.unitbv.school_management_system.exceptions;

import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<Error> handleException(AppException ex) {
        return ResponseEntity.status(ex.getCode())
                .body(Error.builder().message(ex.getMessage()).build());
    }

    @ExceptionHandler(value = {TokenExpiredException.class})
    @ResponseBody
    public ResponseEntity<Error> handleTokenExpiredException(TokenExpiredException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Error.builder().message("Your authentication token has expired. Please login again!").build());
    }
}
