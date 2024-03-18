import { CSSProperties, useContext } from "react";
import { NuttyverseContext } from "~/styles/themes/context";

type Props = {
	/**
	 * Additional class names to apply to the SVG element.
	 */
	className?: string;

	/**
	 * Additional styles to apply to the SVG element.
	 */
	style?: CSSProperties;
};

export const Chibi = (props: Props) => {
	const context = useContext(NuttyverseContext);
	const backgroundColor = context.theme === "light" ? "white" : "black";
	const foregroundColor = context.theme === "light" ? "black" : "white";

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 1024 958"
			className={props.className}
			style={{
				shapeRendering: "geometricPrecision",
				textRendering: "geometricPrecision",
				fillRule: "evenodd",
				clipRule: "evenodd",
				filter: "drop-shadow(0 0 10px rgb(255 255 255 / 0.5))",
				...props.style,
			}}
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<g>
				<path
					style={{ opacity: 1 }}
					fill="transparent"
					d="M -0.5,-0.5 C 340.833,-0.5 682.167,-0.5 1023.5,-0.5C 1023.5,340.833 1023.5,682.167 1023.5,1023.5C 682.167,1023.5 340.833,1023.5 -0.5,1023.5C -0.5,682.167 -0.5,340.833 -0.5,-0.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 837.5,470.5 C 837.44,469.957 837.107,469.624 836.5,469.5C 835.502,478.475 835.168,487.475 835.5,496.5C 834.793,530.97 823.46,561.303 801.5,587.5C 822.794,628.466 816.46,664.632 782.5,696C 762.068,709.809 739.401,716.309 714.5,715.5C 704.312,730.358 691.312,742.025 675.5,750.5C 685.212,759.041 695.378,767.041 706,774.5C 706.667,775.167 706.667,775.833 706,776.5C 700.912,778.013 698.912,781.347 700,786.5C 702.351,793.519 706.851,798.686 713.5,802C 715.895,802.681 718.228,803.515 720.5,804.5C 718.86,807.468 716.86,810.135 714.5,812.5C 704.855,807.678 695.189,802.844 685.5,798C 684.862,796.293 684.862,794.46 685.5,792.5C 684.127,792.343 682.793,792.51 681.5,793C 680.601,794.236 679.434,795.07 678,795.5C 668.261,792.037 658.761,788.204 649.5,784C 638.167,783.667 626.833,783.333 615.5,783C 613.444,782.689 611.444,782.189 609.5,781.5C 607.46,783.177 605.46,784.844 603.5,786.5C 612.56,792.052 621.227,798.219 629.5,805C 640.758,809.922 652.092,814.756 663.5,819.5C 663.528,822.997 663.694,826.664 664,830.5C 665.011,831.337 666.178,831.67 667.5,831.5C 667.282,827.685 668.282,824.352 670.5,821.5C 678.871,825.019 686.871,829.019 694.5,833.5C 686.856,840.643 679.356,847.977 672,855.5C 661.733,850.509 650.899,848.675 639.5,850C 629.948,851.081 624.282,856.247 622.5,865.5C 620.403,863.89 618.07,862.723 615.5,862C 593.172,861.085 574.672,852.252 560,835.5C 548.956,818.143 548.789,800.643 559.5,783C 556.901,782.231 554.401,782.398 552,783.5C 549.707,787.252 547.54,791.086 545.5,795C 535.468,800.681 525.468,806.347 515.5,812C 519.661,812.165 523.494,813.332 527,815.5C 531.741,811.544 536.908,808.21 542.5,805.5C 542.833,805.833 543.167,806.167 543.5,806.5C 542.178,818.157 542.345,829.824 544,841.5C 545.684,847.864 548.184,853.864 551.5,859.5C 541.704,857.873 533.037,853.54 525.5,846.5C 517.833,847.833 510.167,847.833 502.5,846.5C 491.219,856.146 478.219,861.312 463.5,862C 461.652,860.482 460.152,858.649 459,856.5C 455.296,842.307 454.629,827.973 457,813.5C 457.984,808.699 460.15,804.532 463.5,801C 469.672,800.107 475.672,800.773 481.5,803C 488.722,806.193 495.555,810.026 502,814.5C 505.33,813.023 508.83,812.189 512.5,812C 490.578,799.289 468.078,787.789 445,777.5C 438.07,790.966 432.737,804.966 429,819.5C 452.745,858.126 480.245,893.96 511.5,927C 514.28,927.269 516.446,926.102 518,923.5C 532.378,906.791 546.378,889.791 560,872.5C 575.933,886.043 594.433,893.543 615.5,895C 616.167,897 617.5,898.333 619.5,899C 622.146,899.497 624.813,899.664 627.5,899.5C 628.167,899.5 628.5,899.833 628.5,900.5C 624.575,905.323 620.409,909.99 616,914.5C 614.686,918.181 615.853,920.514 619.5,921.5C 697.908,841.939 771.408,758.272 840,670.5C 842.685,666.073 846.518,664.24 851.5,665C 857,670.5 862.5,676 868,681.5C 868.667,684.167 868.667,686.833 868,689.5C 837.137,720.03 805.971,750.197 774.5,780C 766.556,784.889 759.056,790.389 752,796.5C 710,841.833 668,887.167 626,932.5C 624.67,937.498 626.504,939.664 631.5,939C 644.466,924.366 657.799,910.032 671.5,896C 676.91,895.941 681.743,897.774 686,901.5C 686.19,907.416 686.69,913.249 687.5,919C 695.384,920.777 702.384,924.444 708.5,930C 717.827,936.498 728.16,939.665 739.5,939.5C 740.607,943.767 741.94,947.933 743.5,952C 743.561,953.711 742.894,955.044 741.5,956C 587.5,956.667 433.5,956.667 279.5,956C 277.675,954.534 277.175,952.701 278,950.5C 296.202,912.429 315.202,874.763 335,837.5C 339.084,834.874 343.25,832.374 347.5,830C 371.378,819.396 395.044,808.229 418.5,796.5C 421.907,789.267 424.907,781.934 427.5,774.5C 405.925,770.81 384.925,764.976 364.5,757C 342.945,747.765 325.279,733.765 311.5,715C 273.861,717.924 244.361,704.091 223,673.5C 206.598,645.182 206.431,616.849 222.5,588.5C 199.105,563.671 188.105,534.005 189.5,499.5C 165.899,511.973 141.899,512.64 117.5,501.5C 135.094,497.793 148.261,488.127 157,472.5C 160.911,464.44 164.245,456.106 167,447.5C 172.032,426.371 177.532,405.371 183.5,384.5C 154.738,388.776 130.738,380.109 111.5,358.5C 133.435,360.85 153.435,355.683 171.5,343C 179,336.833 185.833,330 192,322.5C 207.783,301.049 223.95,279.882 240.5,259C 216.619,260.143 197.786,250.976 184,231.5C 175.424,219.101 170.424,205.435 169,190.5C 178.881,201.522 191.047,208.522 205.5,211.5C 210.59,212.965 215.923,213.632 221.5,213.5C 225.018,213.498 228.351,213.165 231.5,212.5C 246.659,211.168 260.992,207.002 274.5,200C 297.833,186 321.167,172 344.5,158C 387.491,135.781 433.158,125.781 481.5,128C 491.94,129.009 502.274,130.342 512.5,132C 487.116,122.641 463.116,110.641 440.5,96C 428.869,90.019 416.869,84.8523 404.5,80.5C 403.429,78.6745 404.096,77.5079 406.5,77C 462.549,58.5278 513.882,67.1945 560.5,103C 572.404,112.989 581.237,125.155 587,139.5C 622.96,130.743 656.126,136.91 686.5,158C 699.332,167.144 706.666,179.477 708.5,195C 708.455,198.687 707.955,202.187 707,205.5C 726.065,212.113 743.232,221.946 758.5,235C 795.885,268.739 822.219,309.739 837.5,358C 842.479,374.707 846.979,391.541 851,408.5C 855.486,427.982 864.986,444.482 879.5,458C 887.034,463.461 895.367,467.294 904.5,469.5C 887.52,476.792 869.853,478.958 851.5,476C 846.607,474.649 841.94,472.815 837.5,470.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 319.5,225.5 C 322.329,236.666 329.329,243.999 340.5,247.5C 328.684,250.15 321.851,257.484 320,269.5C 319.162,264.828 317.496,260.495 315,256.5C 310.143,252.826 304.976,249.826 299.5,247.5C 310.773,244.232 317.439,236.899 319.5,225.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 339.5,265.5 C 340.5,265.5 341.5,265.5 342.5,265.5C 342.491,267.308 342.991,268.975 344,270.5C 346.25,271.708 348.417,273.041 350.5,274.5C 348.207,275.626 346.04,276.959 344,278.5C 342.991,280.025 342.491,281.692 342.5,283.5C 341.5,283.5 340.5,283.5 339.5,283.5C 339.657,282.127 339.49,280.793 339,279.5C 336.86,277.513 334.36,276.18 331.5,275.5C 333.687,273.15 336.187,271.15 339,269.5C 339.49,268.207 339.657,266.873 339.5,265.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 254.5,281.5 C 255.376,281.369 256.043,281.702 256.5,282.5C 258.071,288.062 261.404,292.062 266.5,294.5C 260.741,296.592 257.074,300.592 255.5,306.5C 253.202,301.883 250.202,297.883 246.5,294.5C 248.097,291.4 250.263,288.733 253,286.5C 253.608,284.846 254.108,283.179 254.5,281.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 680.5,358.5 C 679.833,359.833 679.167,361.167 678.5,362.5C 674.192,347.056 663.859,339.222 647.5,339C 655.273,336.362 661.773,331.862 667,325.5C 669.684,318.734 671.518,311.734 672.5,304.5C 675.25,314.189 680.583,322.023 688.5,328C 691.561,330.035 694.895,331.201 698.5,331.5C 698.719,332.675 698.386,333.675 697.5,334.5C 687.069,339.244 681.403,347.244 680.5,358.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 711.5,304.5 C 715.298,307.796 718.964,311.296 722.5,315C 727.406,316.652 732.406,317.985 737.5,319C 733.578,322.251 730.412,326.084 728,330.5C 727.7,336.186 727.7,341.853 728,347.5C 722.764,337.796 714.597,333.13 703.5,333.5C 705.701,328.771 708.201,324.104 711,319.5C 711.499,314.511 711.666,309.511 711.5,304.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 443.5,307.5 C 445.346,314.015 448.346,320.015 452.5,325.5C 457.732,329.283 463.399,332.283 469.5,334.5C 454.509,336.824 445.843,345.491 443.5,360.5C 441.112,345.445 432.445,336.778 417.5,334.5C 432.317,331.351 440.983,322.351 443.5,307.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 640.5,385.5 C 643.815,390.796 646.648,396.462 649,402.5C 659.432,430.561 664.932,459.561 665.5,489.5C 645.514,489.999 626.18,493.499 607.5,500C 617.89,483.378 625.723,465.544 631,446.5C 636.263,426.49 639.43,406.156 640.5,385.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 442.5,465.5 C 444.028,465.517 444.528,466.184 444,467.5C 436.735,479.042 429.235,490.375 421.5,501.5C 410.818,497.263 399.818,494.096 388.5,492C 408.058,486.053 426.058,477.22 442.5,465.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 658.5,533.5 C 656.621,534.341 654.621,534.675 652.5,534.5C 631.939,532.747 611.939,535.247 592.5,542C 579.24,546.858 566.573,552.858 554.5,560C 550.275,563.722 546.608,567.888 543.5,572.5C 528.442,564.463 512.442,562.297 495.5,566C 490.582,566.878 486.082,568.711 482,571.5C 479.378,568.04 476.545,564.707 473.5,561.5C 507.662,554.342 536.495,538.009 560,512.5C 566.667,504.5 573.333,496.5 580,488.5C 576.071,509.28 568.405,528.614 557,546.5C 553.535,550.967 549.702,555.133 545.5,559C 565.276,550.74 581.943,538.074 595.5,521C 599.167,520.667 602.833,520.333 606.5,520C 624.97,513.472 643.97,509.306 663.5,507.5C 662.475,516.32 660.809,524.987 658.5,533.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 659.5,535.5 C 659.5,534.833 659.5,534.167 659.5,533.5C 666.755,526.33 671.421,517.663 673.5,507.5C 677.555,507.176 681.555,507.509 685.5,508.5C 689.697,519.817 692.363,531.483 693.5,543.5C 682.334,539.874 671.001,537.208 659.5,535.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 366.5,508.5 C 380.625,509.491 394.291,512.324 407.5,517C 401.762,523.408 395.429,529.075 388.5,534C 370.761,534.08 353.428,536.413 336.5,541C 346.762,530.245 356.762,519.411 366.5,508.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 493.5,520.5 C 494.525,520.897 494.692,521.563 494,522.5C 485.126,534.374 474.626,544.541 462.5,553C 456.684,552.176 451.018,550.509 445.5,548C 455.288,544.065 464.955,539.732 474.5,535C 481.303,530.687 487.636,525.853 493.5,520.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 883.5,550.5 C 884.966,551.347 885.8,552.68 886,554.5C 887.238,567.465 891.238,579.465 898,590.5C 901.552,593.719 905.385,596.552 909.5,599C 916.365,601.466 923.365,603.466 930.5,605C 930.957,605.414 931.291,605.914 931.5,606.5C 918.948,609.027 907.781,614.36 898,622.5C 890.447,634.027 885.947,646.694 884.5,660.5C 883.914,660.291 883.414,659.957 883,659.5C 881.581,646.907 877.581,635.241 871,624.5C 867.749,620.578 863.916,617.412 859.5,615C 851.565,611.98 843.565,609.147 835.5,606.5C 835.709,605.914 836.043,605.414 836.5,605C 843.326,603.502 849.993,601.502 856.5,599C 866.09,595.077 872.59,588.244 876,578.5C 879.073,569.293 881.573,559.96 883.5,550.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 587.5,561.5 C 588.873,561.343 590.207,561.51 591.5,562C 585.5,566.667 580.167,572 575.5,578C 581.12,576.235 586.787,574.235 592.5,572C 593.944,571.219 595.277,571.386 596.5,572.5C 595.348,589.789 595.181,607.123 596,624.5C 601.278,647.569 615.778,658.069 639.5,656C 658.729,652.771 669.896,641.604 673,622.5C 673.333,604.833 673.667,587.167 674,569.5C 682.198,573.015 690.032,577.182 697.5,582C 702.285,586.069 705.119,591.236 706,597.5C 706.655,589.811 707.489,582.145 708.5,574.5C 711.317,575.095 713.65,576.428 715.5,578.5C 712.44,588.622 708.274,598.289 703,607.5C 699.686,611.981 695.852,615.981 691.5,619.5C 701.536,619.242 711.203,616.909 720.5,612.5C 719.868,625.193 716.368,637.193 710,648.5C 703.13,656.851 694.297,661.351 683.5,662C 656.48,662.872 629.48,662.539 602.5,661C 594.763,660.544 587.096,659.544 579.5,658C 570.596,656.096 564.429,650.929 561,642.5C 555.138,622.593 553.138,602.26 555,581.5C 556.875,576.573 560.042,572.74 564.5,570C 571.88,566.044 579.547,563.211 587.5,561.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 350.5,570.5 C 351.167,587.167 351.833,603.833 352.5,620.5C 357.059,646.879 372.726,658.713 399.5,656C 414.296,653.202 424.129,644.702 429,630.5C 430.101,620.381 430.601,610.214 430.5,600C 430.333,591.5 430.167,583 430,574.5C 429.691,573.234 429.191,572.067 428.5,571C 436.04,572.736 443.373,575.069 450.5,578C 445.833,572 440.5,566.667 434.5,562C 444.883,562.483 454.55,565.483 463.5,571C 466.818,574.314 469.318,578.148 471,582.5C 473.087,604.472 470.42,625.805 463,646.5C 458.329,653.259 451.829,657.092 443.5,658C 437.553,659.32 431.553,660.32 425.5,661C 397.183,662.512 368.85,662.845 340.5,662C 323.581,659.083 313.081,649.25 309,632.5C 307.021,625.935 306.021,619.268 306,612.5C 314.731,618.225 324.231,620.558 334.5,619.5C 326.394,612.892 320.394,604.725 316.5,595C 320.197,584.305 327.531,577.305 338.5,574C 342.307,572.119 346.307,570.953 350.5,570.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 148.5,570.5 C 149.496,570.414 150.329,570.748 151,571.5C 152.705,582.62 156.372,592.953 162,602.5C 169.926,609.366 179.093,613.532 189.5,615C 186.956,617.093 183.956,618.093 180.5,618C 168.005,620.994 159.505,628.494 155,640.5C 153.471,646.619 151.638,652.619 149.5,658.5C 148.018,648.905 144.851,639.905 140,631.5C 137.131,628.296 133.965,625.463 130.5,623C 123.259,619.921 115.926,617.255 108.5,615C 115.977,613.294 123.311,610.961 130.5,608C 136.468,603.357 140.968,597.524 144,590.5C 145.824,583.884 147.324,577.217 148.5,570.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 502.5,589.5 C 513.233,588.501 523.566,590.001 533.5,594C 535.96,595.458 538.127,597.291 540,599.5C 540.322,617.436 543.655,634.769 550,651.5C 554.461,659.5 560.961,665.334 569.5,669C 587.854,673.7 606.521,676.367 625.5,677C 643.167,677.667 660.833,677.667 678.5,677C 691.178,676.702 702.845,673.202 713.5,666.5C 707.34,702.564 687.34,728.064 653.5,743C 587.836,766.625 520.503,773.292 451.5,763C 419.302,758.902 388.636,749.902 359.5,736C 334.047,720.855 318.214,698.688 312,669.5C 311.333,668.167 311.333,666.833 312,665.5C 322.95,672.927 335.117,676.76 348.5,677C 376.242,678.014 403.908,677.014 431.5,674C 439.526,672.425 447.526,670.759 455.5,669C 465.604,665.229 472.771,658.396 477,648.5C 482.372,632.268 485.372,615.601 486,598.5C 490.804,594.018 496.304,591.018 502.5,589.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 242.5,596.5 C 243.59,609.863 246.757,622.863 252,635.5C 253.421,638.009 255.088,640.343 257,642.5C 256.953,633.363 257.953,624.363 260,615.5C 266.464,623.563 274.131,630.23 283,635.5C 288.129,654.054 293.962,672.387 300.5,690.5C 264.394,693.7 240.894,678.033 230,643.5C 225.93,625.558 230.096,609.892 242.5,596.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 738.5,691.5 C 733.968,691.818 729.634,691.485 725.5,690.5C 732.413,672.514 738.247,654.181 743,635.5C 751.236,630.64 758.069,624.307 763.5,616.5C 764.522,619.441 765.355,622.441 766,625.5C 766.421,631.771 766.588,637.771 766.5,643.5C 770.999,637.501 774.165,630.835 776,623.5C 777.891,615.596 779.224,607.596 780,599.5C 780.308,598.692 780.808,598.025 781.5,597.5C 793.672,608.853 798.172,622.853 795,639.5C 788.441,670.227 769.608,687.56 738.5,691.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 775.5,765.5 C 775.5,765.167 775.5,764.833 775.5,764.5C 799.611,736.457 823.611,708.291 847.5,680C 850.785,681.09 853.452,683.257 855.5,686.5C 829.531,713.469 802.864,739.802 775.5,765.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 357.5,689.5 C 358.5,689.5 359.5,689.5 360.5,689.5C 360.66,691.199 360.494,692.866 360,694.5C 355.466,698.699 351.299,703.199 347.5,708C 346.207,708.49 344.873,708.657 343.5,708.5C 343.343,707.127 343.51,705.793 344,704.5C 348.337,699.331 352.837,694.331 357.5,689.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 373.5,689.5 C 376.244,690.072 377.077,691.738 376,694.5C 370.652,700.015 365.152,705.348 359.5,710.5C 357.142,709.001 356.976,707.334 359,705.5C 363.671,699.997 368.504,694.664 373.5,689.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 388.5,690.5 C 389.5,690.5 390.5,690.5 391.5,690.5C 388.121,698.897 382.454,705.564 374.5,710.5C 372.899,709.965 372.399,708.965 373,707.5C 378.004,701.664 383.171,695.997 388.5,690.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 637.5,689.5 C 638.5,689.5 639.5,689.5 640.5,689.5C 640.66,691.199 640.494,692.866 640,694.5C 635.318,699.015 630.818,703.681 626.5,708.5C 625.15,709.95 623.484,710.617 621.5,710.5C 621.343,709.127 621.51,707.793 622,706.5C 627.004,700.664 632.171,694.997 637.5,689.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 653.5,689.5 C 656.244,690.072 657.077,691.738 656,694.5C 650.957,699.375 646.124,704.375 641.5,709.5C 638.761,710.555 637.594,709.555 638,706.5C 643.004,700.664 648.171,694.997 653.5,689.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 667.5,690.5 C 668.833,690.5 670.167,690.5 671.5,690.5C 671.657,691.873 671.49,693.207 671,694.5C 666.194,701.147 660.361,706.481 653.5,710.5C 653.343,709.127 653.51,707.793 654,706.5C 658.711,701.294 663.211,695.961 667.5,690.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 509.5,702.5 C 511.857,702.337 514.19,702.503 516.5,703C 521.995,708.72 528.662,711.054 536.5,710C 538.954,708.171 541.287,706.338 543.5,704.5C 550.04,706.306 551.206,709.973 547,715.5C 540.617,720.266 533.451,721.766 525.5,720C 521.019,718.842 516.853,717.009 513,714.5C 505.196,719.395 496.696,721.228 487.5,720C 480.784,718.31 477.617,714.143 478,707.5C 479.263,705.203 481.097,704.37 483.5,705C 485.792,706.29 487.792,707.957 489.5,710C 494.072,710.887 498.405,710.22 502.5,708C 505.595,707.065 507.929,705.231 509.5,702.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 244.5,728.5 C 245.117,728.611 245.617,728.944 246,729.5C 247.955,741.404 251.621,752.737 257,763.5C 266.78,774.972 279.28,780.972 294.5,781.5C 294.5,782.5 294.5,783.5 294.5,784.5C 280.88,785.894 269.047,791.227 259,800.5C 251.839,811.833 247.173,824.166 245,837.5C 242.826,829.138 240.492,820.805 238,812.5C 231.942,797.878 221.108,789.045 205.5,786C 202.146,785.545 198.813,785.045 195.5,784.5C 195.5,783.5 195.5,782.5 195.5,781.5C 208.374,780.046 219.874,775.379 230,767.5C 237.645,755.544 242.478,742.544 244.5,728.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 714.5,812.5 C 713.833,813.833 712.833,814.833 711.5,815.5C 711.586,814.504 711.252,813.671 710.5,813C 701.076,807.781 691.409,803.448 681.5,800C 680.12,801.324 679.786,802.657 680.5,804C 690.047,808.275 699.38,812.775 708.5,817.5C 707.209,817.263 706.209,817.596 705.5,818.5C 697.193,814.681 688.859,810.847 680.5,807C 676.52,806.641 675.187,808.308 676.5,812C 685.521,815.846 694.521,819.679 703.5,823.5C 702.833,824.167 702.167,824.833 701.5,825.5C 692.537,822.345 683.871,818.512 675.5,814C 674.365,813.251 673.365,813.417 672.5,814.5C 671.11,816.169 670.777,817.836 671.5,819.5C 680.191,823.173 688.857,826.839 697.5,830.5C 696.5,831.5 695.5,832.5 694.5,833.5C 686.871,829.019 678.871,825.019 670.5,821.5C 668.282,824.352 667.282,827.685 667.5,831.5C 666.178,831.67 665.011,831.337 664,830.5C 663.694,826.664 663.528,822.997 663.5,819.5C 652.092,814.756 640.758,809.922 629.5,805C 621.227,798.219 612.56,792.052 603.5,786.5C 605.46,784.844 607.46,783.177 609.5,781.5C 611.444,782.189 613.444,782.689 615.5,783C 626.833,783.333 638.167,783.667 649.5,784C 658.761,788.204 668.261,792.037 678,795.5C 679.434,795.07 680.601,794.236 681.5,793C 682.793,792.51 684.127,792.343 685.5,792.5C 684.862,794.46 684.862,796.293 685.5,798C 695.189,802.844 704.855,807.678 714.5,812.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 648.5,786.5 C 658.178,790.228 667.844,794.061 677.5,798C 676.44,799.298 675.274,800.465 674,801.5C 664.427,797.922 654.927,794.255 645.5,790.5C 646.524,789.148 647.524,787.815 648.5,786.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 644.5,793.5 C 653.996,796.776 663.33,800.443 672.5,804.5C 671.605,806.307 670.272,807.64 668.5,808.5C 659.091,805.364 649.757,802.03 640.5,798.5C 642.082,796.985 643.416,795.319 644.5,793.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 711.5,815.5 C 711.027,816.906 710.027,817.573 708.5,817.5C 699.38,812.775 690.047,808.275 680.5,804C 679.786,802.657 680.12,801.324 681.5,800C 691.409,803.448 701.076,807.781 710.5,813C 711.252,813.671 711.586,814.504 711.5,815.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 638.5,801.5 C 648.773,804.132 658.773,807.632 668.5,812C 667.687,813.803 666.52,815.303 665,816.5C 654.794,813.939 645.294,809.939 636.5,804.5C 637.193,803.482 637.859,802.482 638.5,801.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 815.5,863.5 C 789.815,850.325 763.815,837.658 737.5,825.5C 736.697,824.577 736.53,823.577 737,822.5C 744.087,815.918 750.587,808.918 756.5,801.5C 758.028,802.861 759.695,804.028 761.5,805C 776.304,806.266 789.638,811.266 801.5,820C 814.57,832.037 819.237,846.537 815.5,863.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 705.5,818.5 C 706.376,818.369 707.043,818.702 707.5,819.5C 706.479,821.188 705.145,822.521 703.5,823.5C 694.521,819.679 685.521,815.846 676.5,812C 675.187,808.308 676.52,806.641 680.5,807C 688.859,810.847 697.193,814.681 705.5,818.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 701.5,825.5 C 700.167,827.167 698.833,828.833 697.5,830.5C 688.857,826.839 680.191,823.173 671.5,819.5C 670.777,817.836 671.11,816.169 672.5,814.5C 673.365,813.417 674.365,813.251 675.5,814C 683.871,818.512 692.537,822.345 701.5,825.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 735.5,826.5 C 761.647,839.406 787.98,852.072 814.5,864.5C 831.928,872.38 849.261,880.546 866.5,889C 871.577,891.58 876.244,894.747 880.5,898.5C 881.137,894.429 881.971,890.429 883,886.5C 889.457,880.709 895.124,881.375 900,888.5C 901.392,893.874 900.225,898.541 896.5,902.5C 893.757,902.928 891.424,904.095 889.5,906C 892,908.5 894.5,911 897,913.5C 907.171,904.205 917.338,904.205 927.5,913.5C 938.291,930.435 934.291,942.602 915.5,950C 903.81,951.538 894.31,947.705 887,938.5C 887.072,943.76 886.072,948.76 884,953.5C 877.252,959.55 871.919,958.55 868,950.5C 866.708,942.581 869.875,937.414 877.5,935C 878.022,934.439 878.355,933.772 878.5,933C 875.825,929.475 872.492,926.975 868.5,925.5C 868.16,937.026 862.493,941.526 851.5,939C 847.56,933.401 847.56,927.734 851.5,922C 854.214,920.206 857.214,919.04 860.5,918.5C 859.469,917.3 858.635,915.966 858,914.5C 841.703,906.912 825.537,899.245 809.5,891.5C 791.849,924.821 764.516,937.321 727.5,929C 717.917,925.543 709.25,920.543 701.5,914C 699.323,912.798 696.989,912.298 694.5,912.5C 694.5,907.167 694.5,901.833 694.5,896.5C 694.833,896.5 695.167,896.5 695.5,896.5C 697.169,900.093 698.336,900.093 699,896.5C 719.715,915.445 743.549,920.612 770.5,912C 781.096,907.399 789.929,900.566 797,891.5C 797.798,889.741 797.631,888.074 796.5,886.5C 763.917,916.863 731.25,917.03 698.5,887C 702.994,879.949 702.328,873.449 696.5,867.5C 700.812,862.02 705.312,856.687 710,851.5C 712.382,848.781 715.049,846.447 718,844.5C 724.085,847.138 730.252,849.472 736.5,851.5C 775.193,867.673 813.86,884.173 852.5,901C 853.833,901.667 855.167,901.667 856.5,901C 854.636,899.569 852.636,898.403 850.5,897.5C 850.5,896.167 851.167,895.5 852.5,895.5C 855.221,896.141 857.888,896.641 860.5,897C 857.901,895.205 855.234,893.705 852.5,892.5C 852.833,891.833 853.167,891.167 853.5,890.5C 855.55,890.961 857.55,891.628 859.5,892.5C 860.833,891.833 860.833,891.167 859.5,890.5C 817.963,870.565 776.297,850.898 734.5,831.5C 730.303,828.898 730.636,827.232 735.5,826.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 732.5,832.5 C 769.603,850.268 806.936,867.768 844.5,885C 847.564,886.859 850.564,888.692 853.5,890.5C 853.167,891.167 852.833,891.833 852.5,892.5C 812.867,874.064 772.867,856.398 732.5,839.5C 729.822,838.375 727.488,836.708 725.5,834.5C 727.077,831.213 729.41,830.546 732.5,832.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 730.5,840.5 C 756.51,852.499 782.843,863.999 809.5,875C 823.924,881.881 838.258,888.714 852.5,895.5C 851.167,895.5 850.5,896.167 850.5,897.5C 813.155,880.719 775.489,864.719 737.5,849.5C 731.245,847.415 725.245,844.748 719.5,841.5C 720.48,840.019 721.647,838.685 723,837.5C 725.235,839.202 727.735,840.202 730.5,840.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 598.5,865.5 C 600.905,866.768 603.572,867.435 606.5,867.5C 612.082,868.083 617.416,869.583 622.5,872C 623.136,875.79 623.803,879.623 624.5,883.5C 625.325,879.878 625.825,876.211 626,872.5C 627.512,871.743 628.846,870.743 630,869.5C 630.218,866.574 630.718,863.74 631.5,861C 633.5,859.667 635.5,858.333 637.5,857C 648.037,855.303 658.037,856.803 667.5,861.5C 662.315,866.85 657.315,872.35 652.5,878C 640.246,876.186 630.746,880.353 624,890.5C 622.5,889 621,887.5 619.5,886C 602.53,884.845 586.863,879.845 572.5,871C 561.697,861.89 555.197,850.39 553,836.5C 563.831,852.807 578.998,862.474 598.5,865.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 737.5,825.5 C 763.815,837.658 789.815,850.325 815.5,863.5C 814.833,863.5 814.5,863.833 814.5,864.5C 787.98,852.072 761.647,839.406 735.5,826.5C 736.492,826.672 737.158,826.338 737.5,825.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 737.5,849.5 C 775.489,864.719 813.155,880.719 850.5,897.5C 852.636,898.403 854.636,899.569 856.5,901C 855.167,901.667 853.833,901.667 852.5,901C 813.86,884.173 775.193,867.673 736.5,851.5C 737.338,851.158 737.672,850.492 737.5,849.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 734.5,831.5 C 776.297,850.898 817.963,870.565 859.5,890.5C 860.833,891.167 860.833,891.833 859.5,892.5C 857.55,891.628 855.55,890.961 853.5,890.5C 850.564,888.692 847.564,886.859 844.5,885C 806.936,867.768 769.603,850.268 732.5,832.5C 733.492,832.672 734.158,832.338 734.5,831.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={backgroundColor}
					d="M 732.5,839.5 C 772.867,856.398 812.867,874.064 852.5,892.5C 855.234,893.705 857.901,895.205 860.5,897C 857.888,896.641 855.221,896.141 852.5,895.5C 838.258,888.714 823.924,881.881 809.5,875C 782.843,863.999 756.51,852.499 730.5,840.5C 731.492,840.672 732.158,840.338 732.5,839.5 Z"
				/>
			</g>
			<g>
				<path
					style={{ opacity: 1 }}
					fill={foregroundColor}
					d="M 691.5,892.5 C 691.167,892.5 690.833,892.5 690.5,892.5C 686.8,890.319 683.133,888.153 679.5,886C 682.969,881.364 686.969,877.197 691.5,873.5C 696.969,877.657 696.802,881.657 691,885.5C 690.297,887.929 690.463,890.262 691.5,892.5 Z"
				/>
			</g>
		</svg>
	);
};
