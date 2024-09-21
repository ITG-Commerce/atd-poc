import { BuilderComponentState } from "@builder.io/react/dist/types/src/components/builder-component.component";
import {
  SfButton,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from "@storefront-ui/react";
import classNames from "classnames";

function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 left-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronLeft />
    </SfButton>
  );
}

ButtonPrev.defaultProps = { disabled: false };

function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 right-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronRight />
    </SfButton>
  );
}

ButtonNext.defaultProps = { disabled: false };

interface ProductSliderProps {
  children: React.ReactNode;
  builderState: BuilderComponentState;
}

export default function ProductSlider(props: ProductSliderProps) {
  const { children } = props;

  return (
    <SfScrollable
      className="m-auto py-4 flex items-center gap-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      buttons-placement="floating"
      drag
      slotPreviousButton={<ButtonPrev />}
      slotNextButton={<ButtonNext />}
    >
      {children}
    </SfScrollable>
  );
}
