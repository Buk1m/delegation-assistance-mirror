package com.idemia.ip.office.backend.delegation.assistant.delegations.controllers;

import com.idemia.ip.office.backend.delegation.assistant.delegations.dtos.FlightDto;
import com.idemia.ip.office.backend.delegation.assistant.delegations.services.FlightService;
import com.idemia.ip.office.backend.delegation.assistant.delegations.validationgroups.OnPost;
import com.idemia.ip.office.backend.delegation.assistant.entities.Flight;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@Validated
public class FlightController {
    private static final Logger LOG = LoggerFactory.getLogger(DelegationController.class);

    private FlightService flightService;
    private ModelMapper modelMapper;

    public FlightController(FlightService flightService, ModelMapper modelMapper) {
        this.flightService = flightService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/delegations/{delegationId}/flights")
    @Validated(OnPost.class)
    public Mono<ResponseEntity<FlightDto>> postDelegationFlight(@Valid @RequestBody FlightDto flightDto,
            @PathVariable("delegationId") Long delegationId,
            Principal principal) {
        LOG.info("User: {} adds flight: {} to delegation with id: {}", principal.getName(), flightDto, delegationId);
        Flight flight = modelMapper.map(flightDto, Flight.class);
        return flightService.addFlight(flight, principal.getName(), delegationId)
                .map(e -> modelMapper.map(e, FlightDto.class))
                .map(ResponseEntity::ok);
    }
}
