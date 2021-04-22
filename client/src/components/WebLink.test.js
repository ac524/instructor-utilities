import { render, screen } from '@testing-library/react';

import WebLink from "./WebLink";

describe( "WebLink Component", () => {

    it("should show a link with provided content", () => {

        const content = "Link Text";

        render(<WebLink href="#test">{content}</WebLink>);

        const link = screen.getByRole("link");

        expect(link).toHaveTextContent(content);

    });

    it("should show a link with provided all provided props", () => {

        const linkProps = { id: "test", className: "test", href: "http://test.com/" };

        render(<WebLink {...linkProps}>A web link</WebLink>);

        const link = screen.getByRole("link");

        for( let [ prop, value ] of Object.entries(linkProps) ) {

            expect(link[prop]).toBe(value);

        }


    });

    it("should show a link with safe `new window` props", () => {

        render(<WebLink href="#test">A web link</WebLink>);

        const link = screen.getByRole("link");

        expect(link.rel).toBe("noopener noreferrer");
        expect(link.target).toBe("_blank");

    });

} );