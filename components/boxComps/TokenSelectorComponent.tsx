import { defaultAvailableTokens } from "@/helpers/constants";
import { ChainId, TokenInfo } from "@decent.xyz/box-common";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect } from "react";

export interface TokenSelectMenuProps {
    chainId: ChainId;
    selectedToken : TokenInfo
    onSelectToken: (tokenId: TokenInfo) => void;
    availableTokens?: TokenInfo[];
    renderBtnInner?: (name: string, iconSrc: string) => JSX.Element;
    className?: string;
    anchorToRight?: boolean;
  }

export default function TokenSelectorComponent ({
    chainId,
    selectedToken,
    onSelectToken,
    availableTokens = defaultAvailableTokens[chainId],
    renderBtnInner,
    anchorToRight,
    className = "relative inline-block h-6",
  }: TokenSelectMenuProps) {
    /*
    const searchParams = useSearchParams();
    const searchParamsToken = searchParams.get("name");
    useEffect(() => {
        const chain = searchParams.get("name");
        if (availableChains.includes(Number(chain))) {
            onSelectToken(availableTokens[0]);
        }
    }, [availableTokens, chainId, onSelectToken]);
    */
    return (
        <>
            <Popover className={className}>
                {({ close }) => (
                    <>
                    <Popover.Button>
                        {renderBtnInner ? (
                        renderBtnInner(selectedToken.name, selectedToken.logo!)
                        ) : (
                        <div className="border border-[#BEC3C9] rounded px-2 leading-none inline-flex items-baseline py-1.5">
                            <span className="self-center">
                            <Image
                                className="w-3.5 h-3.5 object-contain"
                                width="14"
                                height="14"
                                alt={selectedToken.name}
                                src={selectedToken.logo!}
                            />
                            </span>
                            <span className="ml-1">{selectedToken.name}</span>
                        </div>
                        )}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                        className={
                            "absolute z-10 w-screen max-w-[11rem] px-4 top-full mt-2" +
                            (anchorToRight ? " -right-4" : " -left-4")
                        }
                        >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-800 py-2">
                            {availableTokens.map((c) => (
                            <button
                                key={c.name}
                                className={
                                "flex w-full items-center py-1 px-3" +
                                " focus:outline-none focus:ring focus:rounded-lg ring-inset" +
                                (c == selectedToken ? " bg-purple-light" : " hover:bg-seasalt")
                                }
                                onClick={() => {
                                onSelectToken(c);
                                close();
                                }}
                            >
                                <Image
                                    className="w-3.5 h-3.5 object-contain"
                                    width="14"
                                    height="14"
                                    src={selectedToken.logo!}
                                    alt={selectedToken.name}
                                />
                                <div className="ml-1">{selectedToken.name}</div>
                            </button>
                            ))}
                        </div>
                        </Popover.Panel>
                    </Transition>
                    </>
                )}
                </Popover>
        </>
    )
}