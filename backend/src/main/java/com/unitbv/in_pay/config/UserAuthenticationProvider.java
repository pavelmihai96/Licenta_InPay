package com.unitbv.in_pay.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.unitbv.in_pay.entities.User;
import com.unitbv.in_pay.services.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final UserService userService;

    @PostConstruct
    protected  void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes()); //Am criptat cheia ca sa nu apara in format text
    }

    public String createToken(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 604800000); // 1 week

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                //.withClaim("email", user.getUsername())
                .withClaim("id", user.getUserId())
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        try {
            //System.out.println("Validating Token: " + token); // Debugging step
            //secretKey = "abc";
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token); // Decode the token

            System.out.println("Decoded Token: " + decoded.getSubject()); // Debugging step

            User user = userService.findByEmail(decoded.getSubject());
            return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
        } catch (TokenExpiredException e) {
            System.out.println("TOKEN Is EXPIRED");
            throw new TokenExpiredException("Token has expired", e.getExpiredOn());
        } catch (Exception e) {
            System.out.println("Token validation failed: " + e.getMessage()); // Debugging step
            throw new RuntimeException("Failed to validate token", e);
        }
    }
}
